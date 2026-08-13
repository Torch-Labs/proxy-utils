import { generateMixedfafoRotatingProxies, generateMixedfafoStickyProxies } from '..';
import { AuthType, ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[], expectedLength: number) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
  expect(splitResult[3].length).toEqual(expectedLength);
};

describe('Generate Mixedfafo Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    port: 61114,
    euPort: 61115,
    asiaPort: 61116,
    username: 'testuname',
  };

  describe('generateMixedfafoStickyProxies()', () => {
    it('should generate a sticky proxy in iproyal format by default', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '61114', 'testuname', 'testpw-country-us-session'], 46);
    });

    it('should generate a sticky proxy in iproyal format for a country belonging to the eu region', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        euHost: 'testhosteu',
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhosteu.test', '61115', 'testuname', 'testpw-country-gr-session'], 46);
    });

    it('should fall back to the default mixedfafo eu/asia hosts when none are provided', () => {
      const euProxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });
      const asiaProxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(euProxy, ['mixedfofaeu.test', '61115', 'testuname', 'testpw-country-gr-session'], 46);
      expectStickyProxy(asiaProxy, ['mixedfofaasia.test', '61116', 'testuname', 'testpw-country-jp-session'], 46);
    });

    it('should generate a socks sticky proxy in iproyal format', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        socksHost: 'sockstesthost',
        socksPort: 61114,
        authType: AuthType.SOCKS5,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['sockstesthost.test', '61114', 'testuname', 'testpw-country-us-session'], 46);
    });

    it('should apply city, sessionDuration and deviceType in iproyal format', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        state: 'ny',
        deviceType: 'mobile',
        sessionDuration: 30,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '61114', 'testuname', 'testpw-country-us-state-ny-session'], 70);
      expect(proxy).toContain('-lifetime-30m');
      expect(proxy).toContain('-device-mobile');
    });

    it('should apply streaming, staticIps and pawn flags in iproyal format', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        streaming: true,
        staticIps: true,
        pawn: true,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toContain('-streaming-1');
      expect(proxy).toContain('-skipispstatic-1');
      expect(proxy).toContain('-direct-1');
    });

    it('should generate a sticky proxy in brightdata format when providerConfig is brightdata', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        providerConfig: 'brightdata',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '61114', 'testuname', 'testpw-country-us-session'], 41);
    });

    it('should generate a sticky proxy in brightdata format for a country belonging to the eu region', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        providerConfig: 'brightdata',
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['mixedfofaeu.test', '61115', 'testuname', 'testpw-country-gr-session'], 41);
    });

    it('should generate a socks sticky proxy in brightdata format', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        providerConfig: 'brightdata',
        socksHost: 'sockstesthost',
        socksPort: 61114,
        authType: AuthType.SOCKS5,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['sockstesthost.test', '61114', 'testuname', 'testpw-country-us-session'], 41);
    });

    it('should apply state and deviceType in brightdata format', () => {
      const proxy = generateMixedfafoStickyProxies({
        ...commonConfig,
        providerConfig: 'brightdata',
        state: 'ny',
        deviceType: 'mobile',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '61114', 'testuname', 'testpw-country-us-state-ny-session'], 60);
      expect(proxy).toContain('-os-mobile');
    });
  });

  describe('generateMixedfafoRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-country-us');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-country-us:testhost.test:61114');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-country-us@testhost.test:61114');
    });

    it('should fall back to the default mixedfafo eu/asia hosts when none are provided', () => {
      const euProxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });
      const asiaProxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(euProxy).toEqual('mixedfofaeu.test:61115:testuname:testpw-country-gr');
      expect(asiaProxy).toEqual('mixedfofaasia.test:61116:testuname:testpw-country-jp');
    });

    it('should generate a socks rotating proxy', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        socksHost: 'sockstesthost',
        socksPort: 61114,
        authType: AuthType.SOCKS5,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('sockstesthost.test:61114:testuname:testpw-country-us');
    });

    it('should apply state, streaming, staticIps, pawn and deviceType in iproyal format', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        state: 'ny',
        deviceType: 'mobile',
        streaming: true,
        staticIps: true,
        pawn: true,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual(
        'testhost.test:61114:testuname:testpw-country-us-state-ny-streaming-1-skipispstatic-1-direct-1-device-mobile',
      );
    });

    it('should generate a rotating proxy in brightdata format when providerConfig is brightdata', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        providerConfig: 'brightdata',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-country-us');
    });

    it('should apply state and deviceType in brightdata format', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        providerConfig: 'brightdata',
        state: 'ny',
        deviceType: 'mobile',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-country-us-state-ny-os-mobile');
    });

    it('should generate a socks rotating proxy in brightdata format', () => {
      const proxy = generateMixedfafoRotatingProxies({
        ...commonConfig,
        providerConfig: 'brightdata',
        socksHost: 'sockstesthost',
        socksPort: 61114,
        authType: AuthType.SOCKS5,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('sockstesthost.test:61114:testuname:testpw-country-us');
    });
  });
});
