import { ProxyConfig } from '../@types';
import { randomString } from '../utils';

const DEFAULT_ELITE_PORT = '7777';

export const generateOxylabsStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  const proxyPort = port ?? DEFAULT_ELITE_PORT;
  return `${host}.${domain}:${proxyPort}:customer-${username}-cc-${country.toLowerCase()}-sessid-${randomString(
    8,
  )}-sesstime-30:${password}`;
};

export const generateOxylabsRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  const proxyPort = port ?? DEFAULT_ELITE_PORT;
  return `${host}.${domain}:${proxyPort}:customer-${username}-cc-${country.toLowerCase()}:${password}`;
};
