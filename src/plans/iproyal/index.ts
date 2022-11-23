import { ProxyConfig } from '../../@types';
import { randomString } from '../../utils';

const DEFAULT_IPROYAL_PORT = '12323';

export const generateIPRoyalStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, state } = input;
  const defaultPort = port ?? DEFAULT_IPROYAL_PORT;

  let proxyString = `country-${country}`;

  if (state) {
    proxyString = `country-${country}_state-${state}`;
  }

  return `${host}.${domain}:${defaultPort}:${username}:${password}_${proxyString}_session-${randomString(8)}`;
};

export const generateIPRoyalRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, state } = input;
  const defaultPort = port ?? DEFAULT_IPROYAL_PORT;

  let proxyString = `country-${country}`;

  if (state) {
    proxyString = `country-${country}_state-${state}`;
  }
  return `${host}.${domain}:${defaultPort}:${username}:${password}_${proxyString}`;
};
