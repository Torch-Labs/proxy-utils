import { ProxyConfig } from '../@types';
import { randomString } from '../utils';

export const generatePrivateStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain } = input;
  return `${host}.${domain}:5500:country-${country.toLowerCase()}-session-${randomString(32)}:${password}`;
};

export const generatePrivateRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain } = input;
  return `${host}.${domain}:5500:country-${country.toLowerCase()}:${password}`;
};
