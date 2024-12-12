import { generatePlanXRotatingProxies, generatePlanXStickyProxies } from '..';
import { ProxyFormat } from '../../../@types';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toContain(expected[0]);
  expect(splitResult[1]).toContain(expected[1]);
  expect(splitResult[2]).toContain(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
};

describe('Generate PlanX Proxies', () => {
  const commonConfig = {
    password: 'testpw',
    username: 'testuname',
    host: '',
    domain: '',
  };

  describe('generateStickyProxies()', () => {
    it('should generate a sticky proxy (DEFAULT format) for country US', () => {
      const input = { ...commonConfig, country: 'US', proxyFormat: ProxyFormat.DEFAULT };
      const result = generatePlanXStickyProxies(input);

      expectStickyProxy(result, ['geox.x.proxiess.com', '6011', 'testuname', 'testpw-country-us_session-']);
    });

    it('should generate a sticky proxy (DEFAULT format) for country Australia - X', () => {
      const input = { ...commonConfig, country: 'AUX', proxyFormat: ProxyFormat.DEFAULT };
      const result = generatePlanXStickyProxies(input);

      expectStickyProxy(result, ['aux.x.proxiess.com', '6002', 'testuname', 'testpw-country-aux_session-']);
    });

    it('should generate a sticky proxy (DEFAULT format) for country Spain - X', () => {
      const input = { ...commonConfig, country: 'ESX', proxyFormat: ProxyFormat.DEFAULT };
      const result = generatePlanXStickyProxies(input);

      expectStickyProxy(result, ['ukx.x.proxiess.com', '6003', 'testuname', 'testpw-country-esx_session-']);
    });
  });
  describe('generateRotatingProxies()', () => {
    it('should generate a sticky proxy (DEFAULT format) for country US', () => {
      const input = { ...commonConfig, country: 'US', proxyFormat: ProxyFormat.DEFAULT };
      const result = generatePlanXRotatingProxies(input);

      expect(result).toEqual('geox.x.proxiess.com:6011:testuname:testpw-country-us');
    });
    it('should generate a sticky proxy (DEFAULT format) for country Australia - X', () => {
      const input = { ...commonConfig, country: 'AUX', proxyFormat: ProxyFormat.DEFAULT };
      const result = generatePlanXRotatingProxies(input);

      expect(result).toEqual('aux.x.proxiess.com:6002:testuname:testpw');
    });
    it('should generate a sticky proxy (DEFAULT format) for country Spain - X', () => {
      const input = { ...commonConfig, country: 'ESX', proxyFormat: ProxyFormat.DEFAULT };
      const result = generatePlanXRotatingProxies(input);

      expect(result).toEqual('ukx.x.proxiess.com:6003:testuname:testpw');
    });
  });
});
