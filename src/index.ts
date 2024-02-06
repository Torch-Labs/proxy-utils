import {
  ProxyGenerationConfig,
  ProxyGenerationPlans,
  ProxyGenerationTypes,
  ProxyGenerationPlansConstant,
} from './@types';
import { generateProxies } from './generation_utils';
import { generateBrightdataRotatingProxies, generateBrightdataStickyProxies } from './plans/brightdata';
import { generateGeonodeRotatingProxies, generateGeonodeStickyProxies } from './plans/geonode';
import { generateIPRoyalRotatingProxies, generateIPRoyalStickyProxies } from './plans/iproyal';
import { generateOxylabsRotatingProxies, generateOxylabsStickyProxies } from './plans/oxylabs';
import { generatePacketstreamRotatingProxies, generatePacketstreamStickyProxies } from './plans/packetstream';
import { generatePrivateRotatingProxies, generatePrivateStickyProxies } from './plans/private-plan';
import { generateSmartRotatingProxies, generateSmartStickyProxies } from './plans/smart';

export const generateProxiesForPlan = (
  config: ProxyGenerationConfig,
  amount: number,
  type: ProxyGenerationTypes,
  planName: ProxyGenerationPlans,
) => {
  switch (planName) {
    case ProxyGenerationPlansConstant.PACKETSTREAM:
      return generateProxies(config, amount, type, {
        rotatingGenerationFn: generatePacketstreamRotatingProxies,
        stickyGenerationFn: generatePacketstreamStickyProxies,
      });
    case ProxyGenerationPlansConstant.OXYLABS:
      return generateProxies(config, amount, type, {
        rotatingGenerationFn: generateOxylabsRotatingProxies,
        stickyGenerationFn: generateOxylabsStickyProxies,
      });
    case ProxyGenerationPlansConstant.PRIVATE:
      return generateProxies(config, amount, type, {
        rotatingGenerationFn: generatePrivateRotatingProxies,
        stickyGenerationFn: generatePrivateStickyProxies,
      });
    case ProxyGenerationPlansConstant.SMART:
      return generateProxies(config, amount, type, {
        rotatingGenerationFn: generateSmartRotatingProxies,
        stickyGenerationFn: generateSmartStickyProxies,
      });
    case ProxyGenerationPlansConstant.BRIGHTDATA:
      return generateProxies(config, amount, type, {
        rotatingGenerationFn: generateBrightdataRotatingProxies,
        stickyGenerationFn: generateBrightdataStickyProxies,
      });
    case ProxyGenerationPlansConstant.IPROYAL:
      return generateProxies(config, amount, type, {
        rotatingGenerationFn: generateIPRoyalRotatingProxies,
        stickyGenerationFn: generateIPRoyalStickyProxies,
      });
    case ProxyGenerationPlansConstant.GEONODE:
      return generateProxies(config, amount, type, {
        rotatingGenerationFn: generateGeonodeRotatingProxies,
        stickyGenerationFn: generateGeonodeStickyProxies,
      });
    default:
      throw new Error('Not implemented');
  }
};
