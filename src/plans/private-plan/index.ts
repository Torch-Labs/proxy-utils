import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';

export const generatePrivateStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, proxyFormat } = input;

  const part1 = `${host}.${domain}`;
  const part2 = `5500`;
  const part3 = `country-${country.toLowerCase()}-session-${randomString(32)}`;
  const part4 = password;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generatePrivateRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, proxyFormat } = input;

  const part1 = `${host}.${domain}`;
  const part2 = `5500`;
  const part3 = `country-${country.toLowerCase()}`;
  const part4 = password;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
