import { generatePrivateRotatingProxies, generatePrivateStickyProxies } from '..';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[3]).toEqual(expected[3]);

  expect(splitResult[2]).toContain(expected[2]);
  expect(splitResult[2].length).toBe(51);
};

describe('Generate Private Proxies', () => {
  describe('generatePrivateStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generatePrivateStickyProxies({
        host: 'test',
        password: 'test',
        country: 'US',
        domain: 'test',
      });

      expectStickyProxy(proxy, ['test.test', '5500', 'country-us-session', 'test']);
    });
  });

  describe('generatePrivateRotatingProxies()', () => {
    it('should generate a rotating proxy', () => {
      const proxy = generatePrivateRotatingProxies({
        host: 'test',
        password: 'test',
        country: 'US',
        domain: 'test',
      });

      const splitResult = proxy.split(':');

      expect(splitResult[0]).toEqual('test.test');
      expect(splitResult[1]).toEqual('5500');
      expect(splitResult[2]).toEqual('country-us');
      expect(splitResult[3]).toEqual('test');
    });
  });
});
