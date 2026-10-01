import { generatePrivatefafoRotatingProxies, generatePrivatefafoStickyProxies } from '..';
import { AuthType, ProxyFormat } from '../../../@types';

// Session ids are random, so mask them (and assert their shape) before comparing
const maskSessionId = (proxy: string) => proxy.replace(/-sessid-[a-z0-9]{8}-/, '-sessid-<id>-');

describe('Generate Privatefafo Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    port: 61114,
    euPort: 61115,
    asiaPort: 61116,
    username: 'testuname',
  };

  describe('generatePrivatefafoStickyProxies()', () => {
    it('should generate a sticky proxy with a session id and the default session time', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhost.test:61114:testuname:testpw-cc-US-sessid-<id>-sesstime-60');
    });

    it('should uppercase the country code', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        country: 'us',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhost.test:61114:testuname:testpw-cc-US-sessid-<id>-sesstime-60');
    });

    it('should generate a unique session id per proxy', () => {
      const first = generatePrivatefafoStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });
      const second = generatePrivatefafoStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(first).not.toEqual(second);
    });

    it('should use the eu host for a country belonging to the eu region', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        euHost: 'testhosteu',
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhosteu.test:61115:testuname:testpw-cc-GR-sessid-<id>-sesstime-60');
    });

    it('should fall back to the default privatefafo eu/asia hosts when none are provided', () => {
      const euProxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });
      const asiaProxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(euProxy)).toEqual('privatefafoeu.test:61115:testuname:testpw-cc-GR-sessid-<id>-sesstime-60');
      expect(maskSessionId(asiaProxy)).toEqual(
        'privatefafoasia.test:61116:testuname:testpw-cc-JP-sessid-<id>-sesstime-60',
      );
    });

    it('should generate a socks sticky proxy', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        socksHost: 'sockstesthost',
        socksPort: 61114,
        authType: AuthType.SOCKS5,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('sockstesthost.test:61114:testuname:testpw-cc-US-sessid-<id>-sesstime-60');
    });

    it('should map UK to the GB country code', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        country: 'UK',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('privatefafoeu.test:61115:testuname:testpw-cc-GB-sessid-<id>-sesstime-60');
    });

    it('should apply city in lowercase with spaces replaced by underscores', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        city: 'Los Angeles',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual(
        'testhost.test:61114:testuname:testpw-cc-US-city-los_angeles-sessid-<id>-sesstime-60',
      );
    });

    it('should apply state with the country prefix instead of cc', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        state: 'New York',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual(
        'testhost.test:61114:testuname:testpw-st-us_new_york-sessid-<id>-sesstime-60',
      );
    });

    it('should not double the country prefix when the state already has it', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        state: 'us_california',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual(
        'testhost.test:61114:testuname:testpw-st-us_california-sessid-<id>-sesstime-60',
      );
    });

    it('should combine state and city', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        state: 'california',
        city: 'los angeles',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual(
        'testhost.test:61114:testuname:testpw-st-us_california-city-los_angeles-sessid-<id>-sesstime-60',
      );
    });

    it('should use ASN alone without the AS prefix and drop other location params', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        asn: 'AS21928',
        state: 'california',
        city: 'los angeles',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhost.test:61114:testuname:testpw-ASN-21928-sessid-<id>-sesstime-60');
    });

    it('should apply deviceType as a lowercase platform filter', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        deviceType: 'Windows',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual(
        'testhost.test:61114:testuname:testpw-cc-US-platform-windows-sessid-<id>-sesstime-60',
      );
    });

    it('should apply sessionDuration in minutes as sesstime', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        sessionDuration: 30,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhost.test:61114:testuname:testpw-cc-US-sessid-<id>-sesstime-30');
    });

    it('should not convert sessionDuration of an hour or more to hours', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        sessionDuration: 120,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhost.test:61114:testuname:testpw-cc-US-sessid-<id>-sesstime-120');
    });

    it('should cap sessionDuration at the oxylabs maximum of 1440 minutes', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        sessionDuration: 3000,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhost.test:61114:testuname:testpw-cc-US-sessid-<id>-sesstime-1440');
    });

    it('should combine location, platform and session params', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        city: 'munich',
        deviceType: 'ios',
        sessionDuration: 15,
        country: 'DE',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual(
        'privatefafoeu.test:61115:testuname:testpw-cc-DE-city-munich-platform-ios-sessid-<id>-sesstime-15',
      );
    });

    it('should ignore streaming, staticIps and pawn flags', () => {
      const proxy = generatePrivatefafoStickyProxies({
        ...commonConfig,
        streaming: true,
        staticIps: true,
        pawn: true,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(maskSessionId(proxy)).toEqual('testhost.test:61114:testuname:testpw-cc-US-sessid-<id>-sesstime-60');
    });
  });

  describe('generatePrivatefafoRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-cc-US');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-cc-US:testhost.test:61114');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-cc-US@testhost.test:61114');
    });

    it('should fall back to the default privatefafo eu/asia hosts when none are provided', () => {
      const euProxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });
      const asiaProxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(euProxy).toEqual('privatefafoeu.test:61115:testuname:testpw-cc-GR');
      expect(asiaProxy).toEqual('privatefafoasia.test:61116:testuname:testpw-cc-JP');
    });

    it('should generate a socks rotating proxy', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        socksHost: 'sockstesthost',
        socksPort: 61114,
        authType: AuthType.SOCKS5,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('sockstesthost.test:61114:testuname:testpw-cc-US');
    });

    it('should map UK to the GB country code', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        country: 'UK',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('privatefafoeu.test:61115:testuname:testpw-cc-GB');
    });

    it('should apply city in lowercase with spaces replaced by underscores', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        city: 'Los Angeles',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-cc-US-city-los_angeles');
    });

    it('should apply state with the country prefix instead of cc', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        state: 'california',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-st-us_california');
    });

    it('should combine state and city', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        state: 'us_california',
        city: 'los angeles',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-st-us_california-city-los_angeles');
    });

    it('should use ASN alone without the AS prefix and drop other location params', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        asn: 'AS21928',
        city: 'los angeles',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-ASN-21928');
    });

    it('should accept an ASN without the AS prefix', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        asn: '21928',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-ASN-21928');
    });

    it('should apply deviceType as a lowercase platform filter', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        deviceType: 'Android',
        asn: 'AS21928',
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-ASN-21928-platform-android');
    });

    it('should not add session params', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        sessionDuration: 30,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-cc-US');
    });

    it('should ignore streaming, staticIps and pawn flags', () => {
      const proxy = generatePrivatefafoRotatingProxies({
        ...commonConfig,
        streaming: true,
        staticIps: true,
        pawn: true,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:61114:testuname:testpw-cc-US');
    });
  });
});
