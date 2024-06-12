import { generateIPRoyalRotatingProxies, generateIPRoyalStickyProxies } from '..';
import { ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
  expect(splitResult[3].length).toEqual(40);
};

describe('Generate Iproyal Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    port: 1234,
    username: 'testuname',
  };
  describe('generateIproyalStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateIPRoyalStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhost.test', '1234', 'testuname', 'testpw-cc-us-sessid']);
    });

    it('should generate a sticky proxy for country belongs to eu region', () => {
      const proxy = generateIPRoyalStickyProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expectStickyProxy(proxy, ['testhosteu.test', '7780', 'testuname', 'testpw-cc-gr-sessid']);
    });
  });

  describe('generateIproyalRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generateIPRoyalRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:1234:testuname:testpw-cc-us');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generateIPRoyalRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-cc-us:testhost.test:1234');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generateIPRoyalRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-cc-us@testhost.test:1234');
    });

    it('should generate a rotating proxy in DEFAULT format for country belongs to eu region', () => {
      const proxy = generateIPRoyalRotatingProxies({
        ...commonConfig,
        country: 'GR',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhosteu.test:7780:testuname:testpw-cc-gr');
    });
  });
});
