import { generateBrightdataRotatingProxies, generateBrightdataStickyProxies } from '..';
import { AuthType, ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
  expect(splitResult[3].length).toEqual(41);
};

describe('Generate Brightdata Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    port: 1234,
    username: 'testuname',
  };
  describe('generateBrightdataStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateBrightdataStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '1234', 'testuname', 'testpw-country-US-session-']);
    });

    it('should generate a socks sticky proxy for country belongs to us region', () => {
      const proxy = generateBrightdataStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
        socksHost: 'socksbrd',
        authType: AuthType.SOCKS5,
      });

      expectStickyProxy(proxy, ['socksbrd.test', '22228', 'testuname', 'testpw-country-US-session-']);
    });

    it('should generate a socks sticky proxy for country belongs to eu region', () => {
      const proxy = generateBrightdataStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
        socksEuHost: 'socksbrdeu',
        authType: AuthType.SOCKS5,
      });

      expectStickyProxy(proxy, ['socksbrdeu.test', '22229', 'testuname', 'testpw-country-GR-session-']);
    });

    it('should generate a socks sticky proxy for country belongs to asia region', () => {
      const proxy = generateBrightdataStickyProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
        socksAsiaHost: 'socksbrdasia',
        authType: AuthType.SOCKS5,
      });

      expectStickyProxy(proxy, ['socksbrdasia.test', '22230', 'testuname', 'testpw-country-JP-session-']);
    });
  });

  describe('generateBrightdataRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generateBrightdataRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:1234:testuname:testpw-country-US');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generateBrightdataRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-country-US:testhost.test:1234');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generateBrightdataRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-country-US@testhost.test:1234');
    });

    it('should generate a socks rotating proxy in DEFAULT format for country belongs to eu region', () => {
      const proxy = generateBrightdataRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
        authType: AuthType.SOCKS5,
        socksHost: 'socksbrd',
      });

      expect(proxy).toEqual('socksbrd.test:22228:testuname:testpw-country-US');
    });

    it('should generate a socks rotating proxy in DEFAULT format for country belongs to eu region', () => {
      const proxy = generateBrightdataRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
        authType: AuthType.SOCKS5,
        socksEuHost: 'socksbrdeu',
      });

      expect(proxy).toEqual('socksbrdeu.test:22229:testuname:testpw-country-GR');
    });
    it('should generate a socks rotating proxy in DEFAULT format for country belongs to eu region', () => {
      const proxy = generateBrightdataRotatingProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
        authType: AuthType.SOCKS5,
        socksAsiaHost: 'socksbrdasia',
      });

      expect(proxy).toEqual('socksbrdasia.test:22230:testuname:testpw-country-JP');
    });
  });
});
