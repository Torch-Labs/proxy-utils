import { generatePacketstreamRotatingProxies, generatePacketstreamStickyProxies } from '..';
import { ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toContain(expected[0]);
  expect(splitResult[1]).toContain(expected[1]);
  expect(splitResult[2]).toContain(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
};

describe('Generate Basic Proxies', () => {
  const commonInput = {
    host: 'host',
    username: 'username',
    password: 'password',
    country: 'country',
    domain: 'domain',
    port: 1234,
  };

  describe('generateStickyProxies()', () => {
    it('should generate a sticky proxy (DEFAULT format)', () => {
      const input = { ...commonInput, proxyFormat: ProxyFormat.DEFAULT };
      const result = generatePacketstreamStickyProxies(input);

      expectStickyProxy(result, ['host.domain', '1234', 'username', 'password_country-country_session-']);
    });

    it('should generate a sticky proxy (FORMAT_1 format)', () => {
      const input = { ...commonInput, proxyFormat: ProxyFormat.FORMAT_1 };
      const result = generatePacketstreamStickyProxies(input);

      expectStickyProxy(result, ['username', 'password_country-country_session-', 'host.domain', '1234']);
    });
  });

  describe('generateRotatingProxies()', () => {
    it('should generate a rotating proxy (DEFAULT format)', () => {
      const input = { ...commonInput, proxyFormat: ProxyFormat.DEFAULT };
      const expected = 'host.domain:1234:username:password_country-country';
      const result = generatePacketstreamRotatingProxies(input);

      expect(result).toEqual(expected);
    });

    it('should generate a rotating proxy (FORMAT_1 format)', () => {
      const input = { ...commonInput, proxyFormat: ProxyFormat.FORMAT_1 };
      const expected = 'username:password_country-country:host.domain:1234';
      const result = generatePacketstreamRotatingProxies(input);

      expect(result).toEqual(expected);
    });

    it('should generate a rotating proxy (FORMAT_2 format)', () => {
      const input = { ...commonInput, proxyFormat: ProxyFormat.FORMAT_2 };
      const expected = 'username:password_country-country@host.domain:1234';
      const result = generatePacketstreamRotatingProxies(input);

      expect(result).toEqual(expected);
    });
  });
});
