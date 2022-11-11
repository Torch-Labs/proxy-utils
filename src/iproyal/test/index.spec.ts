import { generateIPRoyalRotatingProxies, generateIPRoyalStickyProxies } from '..';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  console.log(proxy);
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
  expect(splitResult[3].length).toEqual(34);
};

describe('Generate IPRoyal Proxies', () => {
  describe('generateIPRoyalStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateIPRoyalStickyProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expectStickyProxy(proxy, ['testhost.test', '1234', 'testuname', 'testpw_country-US_session-']);
    });
  });

  describe('generateIPRoyalRotatingProxies()', () => {
    it('should generate a rotating proxy', () => {
      const proxy = generateIPRoyalRotatingProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expect(proxy).toEqual('testhost.test:1234:testuname:testpw_country-US');
    });
  });
});
