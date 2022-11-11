import { generatePacketstreamRotatingProxies, generatePacketstreamStickyProxies } from '..';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3].slice(0, 33)).toEqual(expected[3]);
  expect(splitResult[3].slice(33, 40).length).toEqual(7);
};

describe('Generate Basic Proxies', () => {
  describe('generateStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const input = {
        host: 'host',
        username: 'username',
        password: 'password',
        country: 'country',
        domain: 'domain',
        port: 1234,
      };
      const result = generatePacketstreamStickyProxies(input);

      expectStickyProxy(result, ['host.domain', '1234', 'username', 'password_country-country_session-']);
    });
  });

  describe('generateRotatingProxies()', () => {
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
      const result = generatePacketstreamRotatingProxies(input);

      expect(result).toEqual(expected);
    });
  });
});
