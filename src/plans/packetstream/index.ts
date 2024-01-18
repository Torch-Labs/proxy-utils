import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';

const DEFAULT_BASIC_PORT = '31112';

export const generatePacketstreamStickyProxies = (input: ProxyConfig) => {
  const { host, username, password, country, domain, port, ssl, proxyFormat } = input;
  const proxyPort = port ?? DEFAULT_BASIC_PORT;

  let proxyHost = host;
  if (ssl) {
    proxyHost = `https://${host}`;
  }

  const part1 = `${proxyHost}.${domain}`;
  const part2 = `${proxyPort}`;
  const part3 = `${username}`;
  const part4 = `${password}_country-${country}_session-${randomString(7)}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generatePacketstreamRotatingProxies = (input: ProxyConfig) => {
  const { host, username, password, country, domain, port, ssl, proxyFormat } = input;
  const proxyPort = port ?? DEFAULT_BASIC_PORT;

  let proxyHost = host;
  if (ssl) {
    proxyHost = `https://${host}`;
  }

  const part1 = `${proxyHost}.${domain}`;
  const part2 = `${proxyPort}`;
  const part3 = `${username}`;
  const part4 = `${password}_country-${country}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
