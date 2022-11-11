import { ProxyConfig, ProxyGenerationConfig, ProxyGenerationTypes, ProxyGenerationTypesConstant } from '../@types';
import { randomString } from '../utils';
import countries from './countries';

const DEFAULT_BASIC_PORT = '31112';

export const generateStickyProxies = (input: ProxyConfig) => {
  const { host, username, password, country, domain, port } = input;
  const proxyPort = port ?? DEFAULT_BASIC_PORT;
  return `${host}.${domain}:${proxyPort}:${username}:${password}_country-${country}_session-${randomString(7)}`;
};

export const generateRotatingProxies = (input: ProxyConfig) => {
  const { host, username, password, country, domain, port } = input;
  const proxyPort = port ?? DEFAULT_BASIC_PORT;
  return `${host}.${domain}:${proxyPort}:${username}:${password}_country-${country}`;
};

export const generateProxyForType = (config: ProxyConfig, type: ProxyGenerationTypes) => {
  if (type === ProxyGenerationTypesConstant.STICKY) {
    return generateStickyProxies(config);
  }
  return generateRotatingProxies(config);
};

export const generateProxies = (config: ProxyGenerationConfig, amount: number, type: ProxyGenerationTypes) => {
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
      );
      generatedProxyList.push(proxy);
    }
  }

  return generatedProxyList;
};
