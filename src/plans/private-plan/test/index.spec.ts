import { generatePrivateRotatingProxies, generatePrivateStickyProxies } from '..';
import { ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[3]).toEqual(expected[3]);

  expect(splitResult[2]).toContain(expected[2]);
  expect(splitResult[2].length).toBe(51);
};

describe('Generate Private Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpass',
    domain: 'testdomain',
  };

  describe('generatePrivateStickyProxies()', () => {
    it('should generate a sticky proxy in DEFAULT format', () => {
      const proxy = generatePrivateStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.testdomain', '5500', 'country-us-session', 'testpass']);
    });
  });

  describe('generatePrivateRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generatePrivateRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      const splitResult = proxy.split(':');

      expect(splitResult[0]).toEqual('testhost.testdomain');
      expect(splitResult[1]).toEqual('5500');
      expect(splitResult[2]).toEqual('country-us');
      expect(splitResult[3]).toEqual('testpass');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generatePrivateRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      const splitResult = proxy.split(':');

      expect(splitResult[0]).toEqual('country-us');
      expect(splitResult[1]).toEqual('testpass');
      expect(splitResult[2]).toEqual('testhost.testdomain');
      expect(splitResult[3]).toEqual('5500');
    });
  });
});
