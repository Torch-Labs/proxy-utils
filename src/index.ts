import {
  ProxyGenerationConfig,
  ProxyGenerationPlans,
  ProxyGenerationTypes,
  ProxyGenerationPlansConstant,
} from './@types';
import { generateBrightdataRotatingProxies, generateBrightdataStickyProxies } from './brightdata';
import { generateProxies } from './generation_utils';
import { generateIPRoyalRotatingProxies, generateIPRoyalStickyProxies } from './iproyal';
import { generateOxylabsRotatingProxies, generateOxylabsStickyProxies } from './oxylabs';
import { generatePacketstreamRotatingProxies, generatePacketstreamStickyProxies } from './packetstream';
import { generatePrivateRotatingProxies, generatePrivateStickyProxies } from './private-plan';
import { generateSmartRotatingProxies, generateSmartStickyProxies } from './smart';

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
    default:
      throw new Error('Not implemented');
  }
};
