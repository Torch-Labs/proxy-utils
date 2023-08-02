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
    it('Should give an empty list for empty country list', () => {
      const result = generateProxiesForPlan(
        {
          ...config,
          countryList: [],
        },
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.PACKETSTREAM,
      );
      expect(result).toHaveLength(0);
    });
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

    it('Should generate rotating proxies for packetstream with 1 country and ssl enabled', () => {
      const result = generateProxiesForPlan(
        { ...config, ssl: true },
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.PACKETSTREAM,
      );
      result.forEach((proxy) => {
        expect(proxy).toEqual('https://testhost.killerproxies.com:1234:testuser:testpw_country-US');
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
        expect(proxy).toEqual('testhost.oxylabs.io:1234:testuser:testpw-cc-us');
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
        const re = /testhost.oxylabs.io:1234:testuser:testpw-cc-us-sessid-.{8}-sesstime-60/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate sticky proxies for oxylabs with 1 country and 30 minutes session duration', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          domain: 'oxylabs.io',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
          sessionDuration: 20,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.OXYLABS,
      );

      result.forEach((proxy) => {
        const re = /testhost.oxylabs.io:1234:testuser:testpw-cc-us-sessid-.{8}-sesstime-20/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate rotating proxies for oxylabs with 1 country and city', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          city: 'new_york',
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
        expect(proxy).toEqual('testhost.oxylabs.io:1234:testuser:testpw-cc-us-city-new_york');
      });
    });

    it('Should generate sticky proxies for oxylabs with 1 country and city', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          city: 'new_york',
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
        const re = /testhost.oxylabs.io:1234:testuser:testpw-cc-us-city-new_york-sessid-.{8}-sesstime-60/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate sticky proxies for oxylabs with 1 country, city and 30 minutes session duration', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          city: 'new_york',
          domain: 'oxylabs.io',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
          sessionDuration: 20,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.OXYLABS,
      );
      result.forEach((proxy) => {
        const re = /testhost.oxylabs.io:1234:testuser:testpw-cc-us-city-new_york-sessid-.{8}-sesstime-20/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate rotating proxies for oxylabs with country us and state', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          state: 'us_california',
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
        expect(proxy).toEqual('testhost.oxylabs.io:1234:testuser:testpw-cc-us-state-us_california');
      });
    });

    it('Should generate sticky proxies for oxylabs with country us and state', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          state: 'us_california',
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
        const re = /testhost.oxylabs.io:1234:testuser:testpw-cc-us-state-us_california-sessid-.{8}-sesstime-60/g;
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
        'testhost.oxylabs.io:1234:testuser:testpw-cc-us',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-ca',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-mx',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-us',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-ca',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-mx',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-us',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-ca',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-mx',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-us',
        'testhost.oxylabs.io:1234:testuser:testpw-cc-ca',
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
        const re = /testhost.oxylabs.io:1234:testuser:testpw-cc-(us|ca|mx)-sessid-.{8}-sesstime-60/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
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
        expect(proxy).toEqual('testhost.smartproxy.com:1234:testuser:testpw-cc-us');
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
        const re = /testhost.smartproxy.com:1234:testuser:testpw-cc-us-sessid-.{8}-sesstime-60/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate sticky proxies for smart with 1 country and 30 minutes session duration', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          domain: 'smartproxy.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
          sessionDuration: 20,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.SMART,
      );

      result.forEach((proxy) => {
        const re = /testhost.smartproxy.com:1234:testuser:testpw-cc-us-sessid-.{8}-sesstime-20/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate rotating proxies for smart with 1 country and city', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          city: 'new_york',
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
        expect(proxy).toEqual('testhost.smartproxy.com:1234:testuser:testpw-cc-us-city-new_york');
      });
    });

    it('Should generate sticky proxies for smart with 1 country and city', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          city: 'new_york',
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
        const re = /testhost.smartproxy.com:1234:testuser:testpw-cc-us-city-new_york-sessid-.{8}-sesstime-60/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate sticky proxies for smart with 1 country, city and 30 minutes session duration', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          city: 'new_york',
          domain: 'smartproxy.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 1234,
          sessionDuration: 20,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.SMART,
      );
      result.forEach((proxy) => {
        const re = /testhost.smartproxy.com:1234:testuser:testpw-cc-us-city-new_york-sessid-.{8}-sesstime-20/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate rotating proxies for smart with country us and state', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          state: 'us_california',
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
        expect(proxy).toEqual('testhost.smartproxy.com:1234:testuser:testpw-cc-us-state-us_california');
      });
    });

    it('Should generate sticky proxies for smart with country us and state', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['US'],
          state: 'us_california',
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
        const re = /testhost.smartproxy.com:1234:testuser:testpw-cc-us-state-us_california-sessid-.{8}-sesstime-60/g;
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
        'testhost.smartproxy.com:1234:testuser:testpw-cc-us',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-ca',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-mx',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-us',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-ca',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-mx',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-us',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-ca',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-mx',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-us',
        'testhost.smartproxy.com:1234:testuser:testpw-cc-ca',
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
        const re = /testhost.smartproxy.com:1234:testuser:testpw-cc-(us|ca|mx)-sessid-.{8}-sesstime-60/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
  });

  describe('Brightdata', () => {
    it('Should generate rotating proxies for brightdata with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'brightdata.com',
          password: 'testpw',
          host: 'testhost',
          username: '1234567f62657475786b3863713740746f7263686c6162732e78797a',
          port: 24046,
        },
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.BRIGHTDATA,
      );
      result.forEach((proxy) => {
        expect(proxy).toEqual(
          'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-us:testpw',
        );
      });
    });

    it('Should generate sticky proxies for brightdata with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'brightdata.com',
          password: 'testpw',
          host: 'testhost',
          username: '1234567f62657475786b3863713740746f7263686c6162732e78797a',
          port: 24046,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.BRIGHTDATA,
      );

      result.forEach((proxy) => {
        const re =
          /testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-us-session-.{15}:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate rotating proxies for brightdata with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us', 'ca', 'mx'],
          domain: 'brightdata.com',
          password: 'testpw',
          host: 'testhost',
          username: '1234567f62657475786b3863713740746f7263686c6162732e78797a',
          port: 24046,
        },
        11,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.BRIGHTDATA,
      );

      expect(result).toEqual([
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-us:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-ca:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-mx:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-us:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-ca:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-mx:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-us:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-ca:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-mx:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-us:testpw',
        'testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-ca:testpw',
      ]);
    });

    it('Should generate sticky proxies for brightdata with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us', 'ca', 'mx'],
          domain: 'brightdata.com',
          password: 'testpw',
          host: 'testhost',
          username: '1234567f62657475786b3863713740746f7263686c6162732e78797a',
          port: 24046,
        },
        11,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.BRIGHTDATA,
      );

      result.forEach((proxy) => {
        const re =
          /testhost.brightdata.com:24046:1234567f62657475786b3863713740746f7263686c6162732e78797a-country-(us|ca|mx)-session-.{15}:testpw/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
  });

  describe('IPRoyal', () => {
    it('Should generate rotating proxies for iproyal with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
        },
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.IPROYAL,
      );

      result.forEach((proxy) => {
        expect(proxy).toEqual('testhost.iproyal.com:12323:testuser:testpw_country-us');
      });
    });

    it('Should generate sticky proxies for iproyal with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.IPROYAL,
      );
      result.forEach((proxy) => {
        const re = /testhost.iproyal.com:12323:testuser:testpw_country-us_session-.{8}/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate sticky proxies for iproyal with 1 country', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.IPROYAL,
      );
      result.forEach((proxy) => {
        const re = /testhost.iproyal.com:12323:testuser:testpw_country-us_session-.{8}/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate sticky proxies for iproyal with 1 country and 30 minutes session duration', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
          sessionDuration: 30,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.IPROYAL,
      );
      result.forEach((proxy) => {
        const re = /testhost.iproyal.com:12323:testuser:testpw_country-us_session-.{8}_lifetime-30m/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate sticky proxies for iproyal with 1 country and 120 minutes session duration', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
          sessionDuration: 120,
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.IPROYAL,
      );
      result.forEach((proxy) => {
        const re = /testhost.iproyal.com:12323:testuser:testpw_country-us_session-.{8}_lifetime-2h/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate rotating proxies for iproyal with country us and state', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
          state: 'texas',
        },
        10,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.IPROYAL,
      );

      result.forEach((proxy) => {
        expect(proxy).toEqual('testhost.iproyal.com:12323:testuser:testpw_country-us_state-texas');
      });
    });

    it('Should generate sticky proxies for iproyal with country us and state', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
          state: 'texas',
        },
        10,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.IPROYAL,
      );

      result.forEach((proxy) => {
        const re = /testhost.iproyal.com:12323:testuser:testpw_country-us_state-texas_session-.{8}/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });

    it('Should generate rotating proxies for iproyal with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us', 'ca', 'mx'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
        },
        11,
        ProxyGenerationTypesConstant.ROTATING,
        ProxyGenerationPlansConstant.IPROYAL,
      );
      expect(result).toEqual([
        'testhost.iproyal.com:12323:testuser:testpw_country-us',
        'testhost.iproyal.com:12323:testuser:testpw_country-ca',
        'testhost.iproyal.com:12323:testuser:testpw_country-mx',
        'testhost.iproyal.com:12323:testuser:testpw_country-us',
        'testhost.iproyal.com:12323:testuser:testpw_country-ca',
        'testhost.iproyal.com:12323:testuser:testpw_country-mx',
        'testhost.iproyal.com:12323:testuser:testpw_country-us',
        'testhost.iproyal.com:12323:testuser:testpw_country-ca',
        'testhost.iproyal.com:12323:testuser:testpw_country-mx',
        'testhost.iproyal.com:12323:testuser:testpw_country-us',
        'testhost.iproyal.com:12323:testuser:testpw_country-ca',
      ]);
    });

    it('Should generate sticky proxies for iproyal with multiple countries', () => {
      const result = generateProxiesForPlan(
        {
          countryList: ['us', 'ca', 'mx'],
          domain: 'iproyal.com',
          password: 'testpw',
          host: 'testhost',
          username: 'testuser',
          port: 12323,
        },
        11,
        ProxyGenerationTypesConstant.STICKY,
        ProxyGenerationPlansConstant.IPROYAL,
      );

      result.forEach((proxy) => {
        const re = /testhost.iproyal.com:12323:testuser:testpw_country-(us|ca|mx)_session-.{8}/g;
        expect(re.test(proxy)).toBeTruthy();
      });
    });
  });
});
