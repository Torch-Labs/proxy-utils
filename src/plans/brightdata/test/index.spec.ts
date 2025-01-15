import { generateBrightdataRotatingProxies, generateBrightdataStickyProxies } from '..';
import { ProxyFormat } from '../../../@types';

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
  });
});
