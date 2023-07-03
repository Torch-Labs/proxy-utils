import { generateSmartRotatingProxies, generateSmartStickyProxies } from '..';

const expectStickyProxy = (proxy: string, expected: string[]) => {
  const splitResult = proxy.split(':');

  expect(splitResult[0]).toEqual(expected[0]);
  expect(splitResult[1]).toEqual(expected[1]);
  expect(splitResult[2]).toEqual(expected[2]);
  expect(splitResult[3]).toContain(expected[3]);
  expect(splitResult[3].length).toEqual(40);
};

describe('Generate Smart Proxies', () => {
  describe('generateSmartStickyProxies()', () => {
    it('should generate a sticky proxy', () => {
      const proxy = generateSmartStickyProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expectStickyProxy(proxy, ['testhost.test', '1234', 'testuname', 'testpw-cc-us-sessid']);
    });

    it('should generate a sticky proxy for country belongs to eu region', () => {
      const proxy = generateSmartStickyProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'GR',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expectStickyProxy(proxy, ['testhosteu.test', '7002', 'testuname', 'testpw-cc-gr-sessid']);
    });
  });

  describe('generateRotatingProxies()', () => {
    it('should generate a rotating proxy', () => {
      const proxy = generateSmartRotatingProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'US',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expect(proxy).toEqual('testhost.test:1234:testuname:testpw-cc-us');
    });

    it('should generate a rotating proxy for country belongs to eu region', () => {
      const proxy = generateSmartRotatingProxies({
        host: 'testhost',
        password: 'testpw',
        country: 'GR',
        domain: 'test',
        port: 1234,
        username: 'testuname',
      });

      expect(proxy).toEqual('testhosteu.test:7002:testuname:testpw-cc-gr');
    });
  });
});
