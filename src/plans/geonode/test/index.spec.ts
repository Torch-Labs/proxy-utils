import { generateGeonodeRotatingProxies, generateGeonodeStickyProxies } from '..';
import { ProxyFormat } from '../../../@types';

describe('Generate Geonode Proxies', () => {
  const commonConfig = {
    host: 'testhost',
    password: 'testpw',
    domain: 'test',
    username: 'testuname',
  };

  describe('generateGeonodeStickyProxies()', () => {
    it('should generate a sticky proxy in DEFAULT format', () => {
      const proxy = generateGeonodeStickyProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      const re = /testhost.test:10000:testuname-country-us-session-.{8}-lifetime-60:testpw/g;

      expect(re.test(proxy)).toBeTruthy();
    });
  });

  describe('generateGeonodeRotatingProxies()', () => {
    it('should generate a rotating proxy in DEFAULT format', () => {
      const proxy = generateGeonodeRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.DEFAULT,
      });

      expect(proxy).toEqual('testhost.test:9000:testuname-country-us:testpw');
    });

    it('should generate a rotating proxy in FORMAT_1 format', () => {
      const proxy = generateGeonodeRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_1,
      });

      expect(proxy).toEqual('testuname-country-us:testpw:testhost.test:9000');
    });

    it('should generate a rotating proxy in FORMAT_2 format', () => {
      const proxy = generateGeonodeRotatingProxies({
        ...commonConfig,
        country: 'US',
        proxyFormat: ProxyFormat.FORMAT_2,
      });

      expect(proxy).toEqual('testuname-country-us:testpw@testhost.test:9000');
    });
  });
});
