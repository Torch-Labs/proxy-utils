import { ProxyConfig } from '../../@types';
import { randomString } from '../../utils';

const DEFAULT_SMART_PORT = '7000';

export const generateSmartStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  const proxyPort = port ?? DEFAULT_SMART_PORT;
  return `${host}.${domain}:${proxyPort}:user-${username}-country-${country.toLowerCase()}-session-${randomString(
    15,
  )}:${password}`;
};

export const generateSmartRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  const proxyPort = port ?? DEFAULT_SMART_PORT;
  return `${host}.${domain}:${proxyPort}:user-${username}-country-${country.toLowerCase()}:${password}`;
};
