import { ProxyConfig } from '../@types';
import { randomString } from '../utils';

export const generateBrightdataStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  return `${host}.${domain}:${port}:${username}-country-${country}-session-${randomString(15)}:${password}`;
};

export const generateBrightdataRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username } = input;
  return `${host}.${domain}:${port}:${username}-country-${country}:${password}`;
};
