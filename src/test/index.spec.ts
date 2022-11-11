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
    it.todo('Should generate rotating proxies for private with 1 country');
    it.todo('Should generate sticky proxies for private with 1 country');
    it.todo('Should generate rotating proxies for private with multiple countries');
    it.todo('Should generate sticky proxies for private with multiple countries');
    it.todo('Should generate rotating proxies for private with special pool countries');
    it.todo('Should generate sticky proxies for private with special pool countries');
  });

  describe('Oxylabs', () => {
    it.todo('Should generate rotating proxies for oxylabs with 1 country');
    it.todo('Should generate sticky proxies for oxylabs with 1 country');
    it.todo('Should generate rotating proxies for oxylabs with multiple countries');
    it.todo('Should generate sticky proxies for oxylabs with multiple countries');
    it.todo('Should generate rotating proxies for oxylabs with special pool countries');
    it.todo('Should generate sticky proxies for oxylabs with special pool countries');
  });

  describe('Smart', () => {
    it.todo('Should generate rotating proxies for smart with 1 country');
    it.todo('Should generate sticky proxies for smart with 1 country');
    it.todo('Should generate rotating proxies for smart with multiple countries');
    it.todo('Should generate sticky proxies for smart with multiple countries');
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
