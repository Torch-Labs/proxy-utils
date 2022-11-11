import { generateBrightdataRotatingProxies, generateBrightdataStickyProxies } from '..';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toContain(expected[2]);
  expect(splitResult[3]).toEqual(expected[3]);
  expect(splitResult[2].length).toEqual(44);
};

describe('Generate Brightdata Proxies', () => {
  describe('generateBrightdataStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateBrightdataStickyProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expectStickyProxy(proxy, ['testhost.test', '1234', 'testuname-country-US-session-', 'testpw']);
    });
  });

  describe('generateBrightdataRotatingProxies()', () => {
    it('should generate a rotating proxy', () => {
      const proxy = generateBrightdataRotatingProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expect(proxy).toEqual('testhost.test:1234:testuname-country-US:testpw');
    });
  });
});
