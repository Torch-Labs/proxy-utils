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

  if (!config.countryList || config.countryList.length === 0) {
    return [];
  }

  const remainder = amount % config.countryList.length;
  const proxyAmount = Math.floor(amount / config.countryList.length);

  const generatedProxyList = [];
  const commonConfig = {
    domain: config.domain,
    host: config.host,
    euHost: config.euHost,
    asiaHost: config.asiaHost,
    password: config.password,
    port: config.port,
    euPort: config.euPort,
    asiaPort: config.asiaPort,
    username: config.username,
    sessionDuration: config.sessionDuration,
    ssl: config.ssl,
    streaming: config.streaming,
    proxyFormat: config.proxyFormat,
    authType: config.authType,
    httpsPort: config.httpsPort,
    socksPort: config.socksPort,
    stickyPort: config.stickyPort,
    rotatingPort: config.rotatingPort,
    socksStickyPort: config.socksStickyPort,
    socksRotatingPort: config.socksRotatingPort,
    poolConfig: config.poolConfig,
  };

  for (let i = 0; i < proxyAmount; i++) {
    config.countryList.forEach((country) => {
      const proxy = generateProxyForType(
        {
          country,
          city: config.city,
          state: config.state,
          ...commonConfig,
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
          ...commonConfig,
        },
        type,
        generationFns,
      );
      generatedProxyList.push(proxy);
    }
  }

  return generatedProxyList;
};
