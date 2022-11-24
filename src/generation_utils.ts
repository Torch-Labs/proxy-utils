import { ProxyConfig, ProxyGenerationConfig, ProxyGenerationTypes, ProxyGenerationTypesConstant } from './@types';

type ProxyGenerationFunction = (input: ProxyConfig) => string;

type ProxyGenerationFunctions = {
  stickyGenerationFn: ProxyGenerationFunction;
  rotatingGenerationFn: ProxyGenerationFunction;
};

export const generateProxyForType = (
  config: ProxyConfig,
  type: ProxyGenerationTypes,
  generationFns: ProxyGenerationFunctions,
) => {
  if (type === ProxyGenerationTypesConstant.STICKY) {
    return generationFns.stickyGenerationFn(config);
  }
  return generationFns.rotatingGenerationFn(config);
};

export const generateProxies = (
  config: ProxyGenerationConfig,
  amount: number,
  type: ProxyGenerationTypes,
  generationFns: ProxyGenerationFunctions,
) => {
  if (!ProxyGenerationTypesConstant[type]) {
    throw new Error('Invalid proxy generation type');
  }
  const remainder = amount % config.countryList.length;
  const proxyAmount = Math.floor(amount / config.countryList.length);

  const generatedProxyList = [];

  for (let i = 0; i < proxyAmount; i++) {
    config.countryList.forEach((country) => {
      const proxy = generateProxyForType(
        {
          country,
          city: config.city,
          state: config.state,
          domain: config.domain,
          host: config.host,
          password: config.password,
          port: config.port,
          username: config.username,
          sessionDuration: config.sessionDuration,
          ssl: config.ssl,
        },
        type,
        generationFns,
      );
      generatedProxyList.push(proxy);
    });
  }

  if (remainder > 0) {
    for (let i = 0; i < remainder; i++) {
      const proxy = generateProxyForType(
        {
          country: config.countryList[i],
          domain: config.domain,
          host: config.host,
          password: config.password,
          port: config.port,
          username: config.username,
        },
        type,
        generationFns,
      );
      generatedProxyList.push(proxy);
    }
  }

  return generatedProxyList;
};
