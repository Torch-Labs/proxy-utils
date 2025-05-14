import { generateOxylabsRotatingProxies, generateOxylabsStickyProxies } from '..';
import { AuthType, ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
  expect(splitResult[3].length).toEqual(40);
};

describe('Generate Oxylabs Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    port: 1234,
    username: 'testuname',
  };
  describe('generateOxylabsStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateOxylabsStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '1234', 'testuname', 'testpw-cc-us-sessid']);
    });

    it('should generate a sticky proxy for country belongs to eu region', () => {
      const proxy = generateOxylabsStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhosteu.test', '7778', 'testuname', 'testpw-cc-gr-sessid']);
    });

    it('should generate a sticky proxy for country belongs to asia region', () => {
      const proxy = generateOxylabsStickyProxies({
        ...commonConfig,
        country: 'JP',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhostasia.test', '7779', 'testuname', 'testpw-cc-jp-sessid']);
    });

    it('should generate a socks sticky proxy for country belongs to eu region', () => {
      const proxy = generateOxylabsStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
        socksEuHost: 'socksoxyeu',
        authType: AuthType.SOCKS5,
      });

      expectStickyProxy(proxy, ['socksoxyeu.test', '7781', 'testuname', 'testpw-cc-gr-sessid']);
    });
  });

  describe('generateRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generateOxylabsRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:1234:testuname:testpw-cc-us');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generateOxylabsRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-cc-us:testhost.test:1234');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generateOxylabsRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-cc-us@testhost.test:1234');
    });

    it('should generate a rotating proxy in DEFAULT format for country belongs to eu region', () => {
      const proxy = generateOxylabsRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhosteu.test:7778:testuname:testpw-cc-gr');
    });

    it('should generate a socks rotating proxy in DEFAULT format for country belongs to eu region', () => {
      const proxy = generateOxylabsRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
        authType: AuthType.SOCKS5,
        socksEuHost: 'socskoxyeu',
      });

      expect(proxy).toEqual('socskoxyeu.test:7781:testuname:testpw-cc-gr');
    });
  });
});
