import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_ELITE_PORT = 7777;

const DEFAULT_ELITE_EU_PORT = 7778;

export const generateOxylabsStickyProxies = (input: ProxyConfig) => {
  const { host, euHost, password, country, domain, port, username, state, city, sessionDuration, proxyFormat, euPort } =
    input;
  const proxyPort = port ?? DEFAULT_ELITE_PORT;
  const euProxyPort = euPort ?? DEFAULT_ELITE_EU_PORT;
  const proxyEuHost = euHost ? euHost : `${host}eu`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    port: proxyPort,
    euPort: euProxyPort,
    country: country.toLowerCase(),
  });

  let proxyString = `cc-${country.toLowerCase()}-sessid-${randomString(8)}`;

  if (city) {
    proxyString = `cc-${country.toLowerCase()}-city-${city}-sessid-${randomString(8)}`;
  }

  if (state) {
    proxyString = `cc-${country.toLowerCase()}-state-${state}-sessid-${randomString(8)}`;
  }

  if (sessionDuration) {
    proxyString += `-sesstime-${sessionDuration}`;
  } else {
    proxyString += `-sesstime-60`;
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateOxylabsRotatingProxies = (input: ProxyConfig) => {
  const { host, euHost, password, country, domain, port, username, city, state, proxyFormat, euPort } = input;
  const proxyPort = port ?? DEFAULT_ELITE_PORT;
  const euProxyPort = euPort ?? DEFAULT_ELITE_EU_PORT;
  const proxyEuHost = euHost ?? `${host}eu`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    port: proxyPort,
    euPort: euProxyPort,
    country: country.toLowerCase(),
  });

  let proxyString = `cc-${country.toLowerCase()}`;

  if (city) {
    proxyString = `cc-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `cc-${country.toLowerCase()}-state-${state}`;
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
