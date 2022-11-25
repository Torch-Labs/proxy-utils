import { ProxyConfig } from '../../@types';
import { randomString } from '../../utils';

const DEFAULT_IPROYAL_PORT = '12323';

export const generateIPRoyalStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, state, sessionDuration } = input;
  const defaultPort = port ?? DEFAULT_IPROYAL_PORT;

  let proxyString = `country-${country}_session-${randomString(8)}`;

  if (state) {
    proxyString = `country-${country}_state-${state}_session-${randomString(8)}`;
  }

  if (sessionDuration) {
    if (sessionDuration < 60) {
      proxyString += `_lifetime-${sessionDuration}m`;
    }
    if (sessionDuration >= 60) {
      proxyString += `_lifetime-${Math.floor(sessionDuration / 60)}h`;
    }
  }

  return `${host}.${domain}:${defaultPort}:${username}:${password}_${proxyString}`;
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
