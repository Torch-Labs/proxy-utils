import { generateMOBILERotatingProxies, generateMOBILEStickyProxies } from '..';
import { AuthType, ProxyFormat } from '../../../@types';

describe('Generate MOBILE Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    username: 'testuname',
  };

  describe('generateMOBILEStickyProxies()', () => {
    it('should generate a sticky proxy in DEFAULT format for a non-eu/asia country', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      const re = /^testhost\.test:41112:testuname:testpw-country-us-session-[a-z0-9]{8}-lifetime-1h$/;
      expect(re.test(proxy)).toBeTruthy();
    });

    it('should route to the default eu host/port for an eu country', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'DE',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      const re = /^testhosteu\.test:41113:testuname:testpw-country-de-session-[a-z0-9]{8}-lifetime-1h$/;
      expect(re.test(proxy)).toBeTruthy();
    });

    it('should use an explicit euHost when provided', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'DE',
        euHost: 'customeu',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.startsWith('customeu.test:41113:')).toBeTruthy();
    });

    it('should route to the default asia host/port for an asia country', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      const re = /^testhostasia\.test:41114:testuname:testpw-country-jp-session-[a-z0-9]{8}-lifetime-1h$/;
      expect(re.test(proxy)).toBeTruthy();
    });

    it('should include the city in the session string when provided', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        city: 'newyork',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      const re = /^testhost\.test:41112:testuname:testpw-country-us-city-newyork-session-[a-z0-9]{8}-lifetime-1h$/;
      expect(re.test(proxy)).toBeTruthy();
    });

    it('should default to a 1h lifetime when sessionDuration is not provided', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.endsWith('-lifetime-1h')).toBeTruthy();
    });

    it('should use a minute-based lifetime when sessionDuration is below 60', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        sessionDuration: 30,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.endsWith('-lifetime-30m')).toBeTruthy();
    });

    it('should use a floored hour-based lifetime when sessionDuration is 60 or above', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        sessionDuration: 150,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.endsWith('-lifetime-2h')).toBeTruthy();
    });

    it('should append an isp segment before the lifetime when asn is provided', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        asn: 'AS1234',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.endsWith('-isp-AS1234-lifetime-1h')).toBeTruthy();
    });

    it('should route to socksHost/socksPort for SOCKS5 auth on a default-region country', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        socksHost: 'sockshost',
        authType: AuthType.SOCKS5,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.startsWith('sockshost.test:41112:')).toBeTruthy();
    });

    it('should derive the eu socks host from socksHost for SOCKS5 auth on an eu country', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'DE',
        socksHost: 'sockshost',
        authType: AuthType.SOCKS5,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.startsWith('sockshosteu.test:41113:')).toBeTruthy();
    });

    it('should use an explicit socksAsiaHost for SOCKS5 auth on an asia country', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'JP',
        socksAsiaHost: 'customsocksasia',
        authType: AuthType.SOCKS5,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.startsWith('customsocksasia.test:41114:')).toBeTruthy();
    });

    it('should honor custom port overrides', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        port: 9999,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy.startsWith('testhost.test:9999:')).toBeTruthy();
    });

    it('should format output using FORMAT_1', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      const re = /^testuname:testpw-country-us-session-[a-z0-9]{8}-lifetime-1h:testhost\.test:41112$/;
      expect(re.test(proxy)).toBeTruthy();
    });

    it('should format output using FORMAT_2', () => {
      const proxy = generateMOBILEStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      const re = /^testuname:testpw-country-us-session-[a-z0-9]{8}-lifetime-1h@testhost\.test:41112$/;
      expect(re.test(proxy)).toBeTruthy();
    });
  });

  describe('generateMOBILERotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format for a non-eu/asia country', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:41112:testuname:testpw-country-us');
    });

    it('should route to the default eu host/port for an eu country', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'DE',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhosteu.test:41113:testuname:testpw-country-de');
    });

    it('should route to the default asia host/port for an asia country', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhostasia.test:41114:testuname:testpw-country-jp');
    });

    it('should include the city in the proxy string when provided', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        city: 'newyork',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:41112:testuname:testpw-country-us-city-newyork');
    });

    it('should append an isp segment when asn is provided', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        asn: 'AS1234',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:41112:testuname:testpw-country-us-isp-AS1234');
    });

    it('should combine city and asn in the proxy string', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        city: 'newyork',
        asn: 'AS1234',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:41112:testuname:testpw-country-us-city-newyork-isp-AS1234');
    });

    it('should route to socksHost/socksPort for SOCKS5 auth on a default-region country', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        socksHost: 'sockshost',
        socksPort: 5000,
        authType: AuthType.SOCKS5,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('sockshost.test:5000:testuname:testpw-country-us');
    });

    it('should derive the asia socks host from socksHost for SOCKS5 auth on an asia country', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'JP',
        socksHost: 'sockshost',
        authType: AuthType.SOCKS5,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('sockshostasia.test:41114:testuname:testpw-country-jp');
    });

    it('should honor custom port overrides', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        port: 9999,
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:9999:testuname:testpw-country-us');
    });

    it('should format output using FORMAT_1', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-country-us:testhost.test:41112');
    });

    it('should format output using FORMAT_2', () => {
      const proxy = generateMOBILERotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-country-us@testhost.test:41112');
    });
  });
});
