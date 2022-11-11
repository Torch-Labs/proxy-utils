import { ProxyConfig, ProxyGenerationConfig, ProxyGenerationTypes, ProxyGenerationTypesConstant } from './@types';

type ProxyGenerationFunction = (input: ProxyConfig) => string;

export const generateProxyForType = (
  config: ProxyConfig,
  type: ProxyGenerationTypes,
  generationFn: ProxyGenerationFunction,
) => {
  if (type === ProxyGenerationTypesConstant.STICKY) {
    return generationFn(config);
  }
  return generationFn(config);
};

export const generateProxies = (
  config: ProxyGenerationConfig,
  amount: number,
  type: ProxyGenerationTypes,
  generationFn: ProxyGenerationFunction,
) => {
  if (!ProxyGenerationTypesConstant[type]) {
    throw new Error('Invalid proxy generation type');
  }
  const remainder = amount % config.countryList.length;
  const proxyAmount = ~~(amount / config.countryList.length);

  const generatedProxyList = [];

  for (let i = 0; i < proxyAmount; i++) {
    config.countryList.forEach((country) => {
      const proxy = generateProxyForType(
        {
          country: country,
          domain: config.domain,
          host: config.host,
          password: config.password,
          port: config.port,
          username: config.username,
        },
        type,
        generationFn,
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
        generationFn,
      );
      generatedProxyList.push(proxy);
    }
  }

  return generatedProxyList;
};
