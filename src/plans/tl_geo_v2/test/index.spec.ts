import { generateTlGeoV2RotatingProxies, generateTlGeoV2StickyProxies } from '..';
import { ProxyFormat } from '../../../@types';

describe('Generate TlGeoV2 Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    username: 'testuname',
  };

  describe('generateTlGeoV2StickyProxies()', () => {
    it('should generate a sticky proxy in DEFAULT format', () => {
      const proxy = generateTlGeoV2StickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      const re = /testhost.test:9000:testuname:testpw-country-us-session-.{8}-lifetime-60/g;

      expect(re.test(proxy)).toBeTruthy();
    });
  });

  describe('generateTlGeoV2RotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generateTlGeoV2RotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:9000:testuname:testpw-country-us');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generateTlGeoV2RotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname:testpw-country-us:testhost.test:9000');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generateTlGeoV2RotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname:testpw-country-us@testhost.test:9000');
    });
  });
});
