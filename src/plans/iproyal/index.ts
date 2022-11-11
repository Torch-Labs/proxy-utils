import { ProxyConfig } from '../../@types';
import { randomString } from '../../utils';

const DEFAULT_IPROYAL_PORT = '12323';

export const generateIPRoyalStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  const defaultPort = port ?? DEFAULT_IPROYAL_PORT;
  return `${host}.${domain}:${defaultPort}:${username}:${password}_country-${country}_session-${randomString(8)}`;
};

export const generateIPRoyalRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  const defaultPort = port ?? DEFAULT_IPROYAL_PORT;
  return `${host}.${domain}:${defaultPort}:${username}:${password}_country-${country}`;
};
