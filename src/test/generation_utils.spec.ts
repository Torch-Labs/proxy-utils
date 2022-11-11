import { ProxyGenerationTypesConstant } from '../@types';
import { generateProxies, generateProxyForType } from '../generation_utils';
import { generatePacketstreamRotatingProxies, generatePacketstreamStickyProxies } from '../packetstream';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3].slice(0, 33)).toEqual(expected[3]);
  expect(splitResult[3].slice(33, 40).length).toEqual(7);
};

describe('Proxy Generation Utils', () => {
  describe('generateProxyForType()', () => {
    it('should generate a sticky proxy', () => {
      const input = {
        host: 'host',
        username: 'username',
        password: 'password',
        country: 'country',
        domain: 'domain',
        port: 1234,
      };
      const result = generateProxyForType(
        input,
        ProxyGenerationTypesConstant.STICKY,
        generatePacketstreamStickyProxies,
      );

      expectStickyProxy(result, ['host.domain', '1234', 'username', 'password_country-country_session-']);
    });

    it('should generate a rotating proxy', () => {
      const input = {
        host: 'host',
        username: 'username',
        password: 'password',
        country: 'country',
        domain: 'domain',
        port: 1234,
      };
      const expected = 'host.domain:1234:username:password_country-country';
      const result = generateProxyForType(
        input,
        ProxyGenerationTypesConstant.ROTATING,
        generatePacketstreamRotatingProxies,
      );

      expect(result).toEqual(expected);
    });
  });

  describe('generateProxies()', () => {
    it('should generate a list of proxies for 1 country and even amount', () => {
      const input = {
        host: 'host',
        username: 'username',
        password: 'password',
        countryList: ['country'],
        domain: 'domain',
        port: 1234,
      };
      const expected = [
        'host.domain:1234:username:password_country-country',
        'host.domain:1234:username:password_country-country',
        'host.domain:1234:username:password_country-country',
      ];
      const result = generateProxies(
        input,
        3,
        ProxyGenerationTypesConstant.ROTATING,
        generatePacketstreamRotatingProxies,
      );

      expect(result).toEqual(expected);
    });

    it('should generate a list of proxies for 3 countrys and even amount', () => {
      const input = {
        host: 'host',
        username: 'username',
        password: 'password',
        countryList: ['country1', 'country2', 'country3'],
        domain: 'domain',
        port: 1234,
      };
      const expected = [
        'host.domain:1234:username:password_country-country1',
        'host.domain:1234:username:password_country-country2',
        'host.domain:1234:username:password_country-country3',
        'host.domain:1234:username:password_country-country1',
        'host.domain:1234:username:password_country-country2',
        'host.domain:1234:username:password_country-country3',
      ];
      const result = generateProxies(
        input,
        6,
        ProxyGenerationTypesConstant.ROTATING,
        generatePacketstreamRotatingProxies,
      );

      expect(result).toEqual(expected);
    });

    it('should generate a list of proxies for 3 countrys and odd amount', () => {
      const input = {
        host: 'host',
        username: 'username',
        password: 'password',
        countryList: ['country1', 'country2', 'country3'],
        domain: 'domain',
        port: 1234,
      };
      const expected = [
        'host.domain:1234:username:password_country-country1',
        'host.domain:1234:username:password_country-country2',
        'host.domain:1234:username:password_country-country3',
        'host.domain:1234:username:password_country-country1',
        'host.domain:1234:username:password_country-country2',
        'host.domain:1234:username:password_country-country3',
        'host.domain:1234:username:password_country-country1',
      ];
      const result = generateProxies(
        input,
        7,
        ProxyGenerationTypesConstant.ROTATING,
        generatePacketstreamRotatingProxies,
      );

      expect(result).toEqual(expected);
    });
  });
});
