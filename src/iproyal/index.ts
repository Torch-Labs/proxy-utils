import { ProxyConfig } from '../@types';
import { randomString } from '../utils';

const DEFAULT_SMART_PORT = '7000';

export const generateIPRoyalStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  return `${host}.${domain}:${port}:${username}:${password}_country-${country}_session-${randomString(8)}`;
};

export const generateIPRoyalRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  return `${host}.${domain}:${port}:${username}:${password}_country-${country}`;
};
