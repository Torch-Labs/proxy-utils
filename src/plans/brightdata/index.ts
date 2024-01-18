import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';

export const generateBrightdataStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, proxyFormat } = input;

  const part1 = `${host}.${domain}`;
  const part2 = `${port}`;
  const part3 = `${username}-country-${country}-session-${randomString(15)}`;
  const part4 = password;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateBrightdataRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, proxyFormat } = input;

  const part1 = `${host}.${domain}`;
  const part2 = `${port}`;
  const part3 = `${username}-country-${country}`;
  const part4 = password;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
