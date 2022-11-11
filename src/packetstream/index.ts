import { ProxyConfig } from '../@types';
import { randomString } from '../utils';

const DEFAULT_BASIC_PORT = '31112';

export const generatePacketstreamStickyProxies = (input: ProxyConfig) => {
  const { host, username, password, country, domain, port } = input;
  const proxyPort = port ?? DEFAULT_BASIC_PORT;
  return `${host}.${domain}:${proxyPort}:${username}:${password}_country-${country}_session-${randomString(7)}`;
};

export const generatePacketstreamRotatingProxies = (input: ProxyConfig) => {
  const { host, username, password, country, domain, port } = input;
  const proxyPort = port ?? DEFAULT_BASIC_PORT;
  return `${host}.${domain}:${proxyPort}:${username}:${password}_country-${country}`;
};
