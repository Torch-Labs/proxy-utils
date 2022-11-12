import { generateProxiesForPlan } from '..';
import { ProxyGenerationPlansConstant, ProxyGenerationTypesConstant } from '../@types';

describe('Proxy Generation', () => {
  describe('Packetstream', () => {
    const config = {
      countryList: ['US'],
      domain: 'killerproxies.com',
      password: 'testpw',
      username: 'testuser',
      host: 'testhost',
      port: 1234,
    };
    it('Should generate rotating proxies for packetstream with 1 country', () => {
      const result = generateProxiesForPlan(
        config,
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.PACKETSTREAM,
      );
      result.forEach((proxy) => {
        expect(proxy).toEqual('testhost.killerproxies.com:1234:testuser:testpw_country-US');
      });
    });
    it('Should generate sticky proxies for packetstream with 1 country', () => {
      const result = generateProxiesForPlan(
        config,
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.PACKETSTREAM,
      );
      result.forEach((proxy) => {
        const re = /testhost.killerproxies.com:1234:testuser:testpw_country-US_session-.{7}/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it('Should generate rotating proxies for packetstream with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          ...config,
          countryList: ['UnitedStates', 'Canada', 'Mexico'],
        },
        11,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.PACKETSTREAM,
      );
      expect(result).toEqual([
        'testhost.killerproxies.com:1234:testuser:testpw_country-UnitedStates',
        'testhost.killerproxies.com:1234:testuser:testpw_country-Canada',
        'testhost.killerproxies.com:1234:testuser:testpw_country-Mexico',
        'testhost.killerproxies.com:1234:testuser:testpw_country-UnitedStates',
        'testhost.killerproxies.com:1234:testuser:testpw_country-Canada',
        'testhost.killerproxies.com:1234:testuser:testpw_country-Mexico',
        'testhost.killerproxies.com:1234:testuser:testpw_country-UnitedStates',
        'testhost.killerproxies.com:1234:testuser:testpw_country-Canada',
        'testhost.killerproxies.com:1234:testuser:testpw_country-Mexico',
        'testhost.killerproxies.com:1234:testuser:testpw_country-UnitedStates',
        'testhost.killerproxies.com:1234:testuser:testpw_country-Canada',
      ]);
    });
    it('Should generate sticky proxies for packetstream with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          ...config,
          countryList: ['UnitedStates', 'Canada', 'Mexico'],
        },
        11,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.PACKETSTREAM,
      );
      result.forEach((proxy) => {
        const re = /testhost.killerproxies.com:1234:testuser:testpw_country-(UnitedStates|Canada|Mexico)_session-.{7}/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it.todo('Should generate rotating proxies for packetstream with special pool countries');
    it.todo('Should generate sticky proxies for packetstream with special pool countries');
  });

  describe('Private', () => {
    const config = {
      countryList: ['US'],
      domain: 'killerproxies.com',
      password: 'testpw',
      host: 'testhost',
    };
    it('Should generate rotating proxies for private with 1 country', () => {
      const result = generateProxiesForPlan(
        config,
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.PRIVATE,
      );
      result.forEach((proxy) => {
        expect(proxy).toEqual('testhost.killerproxies.com:5500:country-us:testpw');
      });
    });
    it('Should generate sticky proxies for private with 1 country', () => {
      const result = generateProxiesForPlan(
        config,
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.PRIVATE,
      );
      result.forEach((proxy) => {
        const re = /testhost.killerproxies.com:5500:country-us-session-.{32}:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it('Should generate rotating proxies for private with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          ...config,
          countryList: ['US', 'CA', 'MX'],
        },
        11,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.PRIVATE,
      );
      expect(result).toEqual([
        'testhost.killerproxies.com:5500:country-us:testpw',
        'testhost.killerproxies.com:5500:country-ca:testpw',
        'testhost.killerproxies.com:5500:country-mx:testpw',
        'testhost.killerproxies.com:5500:country-us:testpw',
        'testhost.killerproxies.com:5500:country-ca:testpw',
        'testhost.killerproxies.com:5500:country-mx:testpw',
        'testhost.killerproxies.com:5500:country-us:testpw',
        'testhost.killerproxies.com:5500:country-ca:testpw',
        'testhost.killerproxies.com:5500:country-mx:testpw',
        'testhost.killerproxies.com:5500:country-us:testpw',
        'testhost.killerproxies.com:5500:country-ca:testpw',
      ]);
    });
    it('Should generate sticky proxies for private with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          ...config,
          countryList: ['US', 'CA', 'MX'],
        },
        11,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.PRIVATE,
      );
      result.forEach((proxy) => {
        const re = /testhost.killerproxies.com:5500:country-(us|ca|mx)-session-.{32}:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it.todo('Should generate rotating proxies for private with special pool countries');
    it.todo('Should generate sticky proxies for private with special pool countries');
  });

  describe('Oxylabs', () => {
    it('Should generate rotating proxies for oxylabs with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          domain: 'oxylabs.io',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.OXYLABS,
      );
      result.forEach((proxy) => {
        expect(proxy).toEqual('testhost.oxylabs.io:1234:customer-testuser-cc-us:testpw');
      });
    });
    it('Should generate sticky proxies for oxylabs with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          domain: 'oxylabs.io',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.OXYLABS,
      );
      result.forEach((proxy) => {
        const re = /testhost.oxylabs.io:1234:customer-testuser-cc-us-sessid-.{8}-sesstime-30:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it('Should generate rotating proxies for oxylabs with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US', 'CA', 'MX'],
          domain: 'oxylabs.io',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        11,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.OXYLABS,
      );
      expect(result).toEqual([
        'testhost.oxylabs.io:1234:customer-testuser-cc-us:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-ca:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-mx:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-us:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-ca:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-mx:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-us:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-ca:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-mx:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-us:testpw',
        'testhost.oxylabs.io:1234:customer-testuser-cc-ca:testpw',
      ]);
    });
    it('Should generate sticky proxies for oxylabs with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US', 'CA', 'MX'],
          domain: 'oxylabs.io',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        11,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.OXYLABS,
      );
      result.forEach((proxy) => {
        const re = /testhost.oxylabs.io:1234:customer-testuser-cc-(us|ca|mx)-sessid-.{8}-sesstime-30:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it.todo('Should generate rotating proxies for oxylabs with special pool countries');
    it.todo('Should generate sticky proxies for oxylabs with special pool countries');
  });

  describe('Smart', () => {
    it('Should generate rotating proxies for smart with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          domain: 'smartproxy.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.SMART,
      );
      result.forEach((proxy) => {
        expect(proxy).toEqual('testhost.smartproxy.com:1234:user-testuser-country-us:testpw');
      });
    });
    it('Should generate sticky proxies for smart with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          domain: 'smartproxy.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.SMART,
      );
      result.forEach((proxy) => {
        console.log(proxy);
        const re = /testhost.smartproxy.com:1234:user-testuser-country-us-session-.{15}:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it('Should generate rotating proxies for smart with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US', 'CA', 'MX'],
          domain: 'smartproxy.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        11,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.SMART,
      );
      expect(result).toEqual([
        'testhost.smartproxy.com:1234:user-testuser-country-us:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-ca:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-mx:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-us:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-ca:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-mx:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-us:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-ca:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-mx:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-us:testpw',
        'testhost.smartproxy.com:1234:user-testuser-country-ca:testpw',
      ]);
    });
    it('Should generate sticky proxies for smart with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US', 'CA', 'MX'],
          domain: 'smartproxy.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
        },
        11,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.SMART,
      );
      result.forEach((proxy) => {
        const re = /testhost.smartproxy.com:1234:user-testuser-country-(us|ca|mx)-session-.{15}:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
    it.todo('Should generate rotating proxies for smart with special pool countries');
    it.todo('Should generate sticky proxies for smart with special pool countries');
  });

  describe('Brightdata', () => {
    it.todo('Should generate rotating proxies for brightdata with 1 country');
    it.todo('Should generate sticky proxies for brightdata with 1 country');
    it.todo('Should generate rotating proxies for brightdata with multiple countries');
    it.todo('Should generate sticky proxies for brightdata with multiple countries');
    it.todo('Should generate rotating proxies for brightdata with special pool countries');
    it.todo('Should generate sticky proxies for brightdata with special pool countries');
  });

  describe('IPRoyal', () => {
    it.todo('Should generate rotating proxies for iproyal with 1 country');
    it.todo('Should generate sticky proxies for iproyal with 1 country');
    it.todo('Should generate rotating proxies for iproyal with multiple countries');
    it.todo('Should generate sticky proxies for iproyal with multiple countries');
    it.todo('Should generate rotating proxies for iproyal with special pool countries');
    it.todo('Should generate sticky proxies for iproyal with special pool countries');
  });
});
