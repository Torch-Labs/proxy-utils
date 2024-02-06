import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';

const DEFAULT_GEONODE_STICKY_PORT = 10000;

const DEFAULT_GEONODE_ROTATING_PORT = 9000;

export const generateGeonodeStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, city, state, sessionDuration, proxyFormat } = input;

  const proxyPort = port ?? DEFAULT_GEONODE_STICKY_PORT;

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}`;
  }

  proxyString = `${proxyString}-session-${randomString(8)}`;

  if (sessionDuration) {
    proxyString += `-lifetime-${sessionDuration}`;
  } else {
    proxyString += `-lifetime-60`;
  }

  const part1 = `${host}.${domain}`;
  const part2 = `${proxyPort}`;
  const part3 = `${username}-${proxyString}`;
  const part4 = `${password}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateGeonodeRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, city, state, proxyFormat } = input;

  const proxyPort = port ?? DEFAULT_GEONODE_ROTATING_PORT;

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}`;
  }

  const part1 = `${host}.${domain}`;
  const part2 = `${proxyPort}`;
  const part3 = `${username}-${proxyString}`;
  const part4 = `${password}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
