import {
  ProxyGenerationConfig,
  ProxyGenerationPlans,
  ProxyGenerationTypes,
  ProxyGenerationPlansConstant,
} from './@types';
import { generateProxies } from './generation_utils';
import { generatePacketstreamRotatingProxies, generatePacketstreamStickyProxies } from './packetstream';

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
    default:
      throw new Error('Not implemented');
  }
};
