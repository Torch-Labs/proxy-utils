import { generateNetnutRotatingProxies, generateNetnutStickyProxies } from '..';
import { AuthType, ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
};

describe('Generate NetNut Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    port: 6500,
    euPort: 6501,
    asiaPort: 6502,
    username: 'testuname',
  };
  describe('generateNetnutStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateNetnutStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '6500', 'testuname', 'testpw-us-sid']);
    });
    it('should generate a sticky proxy for a city', () => {
      const proxy = generateNetnutStickyProxies({
        ...commonConfig,
        country: 'US',
        city: 'alabama',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '6500', 'testuname', 'testpw-res_sc-us_alabama-sid']);
    });
    it('should generate a sticky proxy for country belongs to eu region', () => {
      const proxy = generateNetnutStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhosteu.test', '6501', 'testuname', 'testpw-gr-sid']);
    });
    it('should generate a socks sticky proxy', () => {
      const proxy = generateNetnutStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
        socksHost: 'socksnetnut',
        socksPort: 6503,
        authType: AuthType.SOCKS5,
      });

      expectStickyProxy(proxy, ['socksnetnut.test', '6503', 'testuname', 'testpw-us-sid']);
    });
    it('should generate a socks sticky proxy with a city', () => {
      const proxy = generateNetnutStickyProxies({
        ...commonConfig,
        country: 'US',
        city: 'alabama',
        proxyFormat: ProxyFormat.DEFAULT,
        socksHost: 'socksnetnut',
        socksPort: 6503,
        authType: AuthType.SOCKS5,
      });

      expectStickyProxy(proxy, ['socksnetnut.test', '6503', 'testuname', 'testpw-res_sc-us_alabama-sid']);
    });
    it('should generate a socks sticky proxy for country belongs to eu region', () => {
      const proxy = generateNetnutStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
        socksHost: 'socksnetnut',
        authType: AuthType.SOCKS5,
      });

      expectStickyProxy(proxy, ['socksnetnuteu.test', '6504', 'testuname', 'testpw-gr-sid']);
    });
  });

  describe('generateNetnutRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generateNetnutRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:6500:testuname:testpw-us');
    });
    it('should generate a rotating proxy in DEFAULT format with a city', () => {
      const proxy = generateNetnutRotatingProxies({
        ...commonConfig,
        country: 'US',
        city: 'alabama',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:6500:testuname:testpw-res_sc-us_alabama');
    });

    it('should generate rotating proxy for EU countries', () => {
      const proxy = generateNetnutRotatingProxies({
        ...commonConfig,
        euHost: 'testeu',
        country: 'DE',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testeu.test:6501:testuname:testpw-de');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generateNetnutRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-us:testhost.test:6500');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generateNetnutRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-us@testhost.test:6500');
    });

    it('should generate a rotating proxy in DEFAULT format for country belongs to eu region', () => {
      const proxy = generateNetnutRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhosteu.test:6501:testuname:testpw-gr');
    });
    it('should generate a socks sticky proxy for country belongs to eu region', () => {
      const proxy = generateNetnutRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
        socksHost: 'socksnetnut',
        authType: AuthType.SOCKS5,
      });

      expect(proxy).toEqual('socksnetnuteu.test:6504:testuname:testpw-gr');
    });
  });
});
