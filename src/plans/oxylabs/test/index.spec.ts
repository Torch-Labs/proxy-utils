import { generateOxylabsRotatingProxies, generateOxylabsStickyProxies } from '..';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toContain(expected[2]);
  expect(splitResult[3]).toEqual(expected[3]);
  expect(splitResult[2].length).toEqual(42);
};

describe('Generate Oxylabs Proxies', () => {
  describe('generateOxylabsStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateOxylabsStickyProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expectStickyProxy(proxy, ['testhost.test', '1234', 'testuname-cc-us-sessid-', 'testpw']);
    });
  });

  describe('generateRotatingProxies()', () => {
    it('should generate a rotating proxy', () => {
      const proxy = generateOxylabsRotatingProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expect(proxy).toEqual('testhost.test:1234:testuname-cc-us:testpw');
    });
  });
});
