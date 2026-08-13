import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_MOBILE_PORT = 41112;
const DEFAULT_MOBILE_EU_PORT = 41113;
const DEFAULT_MOBILE_ASIA_PORT = 41114;
const DEFAULT_MOBILE_SOCKS_PORT = 41112;
const DEFAULT_MOBILE_EU_SOCKS_PORT = 41113;
const DEFAULT_MOBILE_ASIA_SOCKS_PORT = 41114;

export const generateMOBILEStickyProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    password,
    country,
    domain,
    username,
    asn,
    city,
    sessionDuration,
    proxyFormat,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    authType,
  } = input;

  const proxyPort = port ?? DEFAULT_MOBILE_PORT;
  const proxyEuPort = euPort ?? DEFAULT_MOBILE_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_MOBILE_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_MOBILE_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_MOBILE_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_MOBILE_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `${host}eu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `${host}asia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `${socksHost}eu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `${socksHost}asia`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    asiaHost: proxyAsiaHost,
    socksHost: socksHost,
    socksEuHost: proxySocksEuHost,
    socksAsiaHost: proxyAsiaSocksHost,
    port: proxyPort,
    euPort: proxyEuPort,
    asiaPort: proxyAsiaPort,
    socksPort: proxySocksPort,
    socksEuPort: proxyEuSocksPort,
    socksAsiaPort: proxyAsiaSocksPort,
    country: country.toLowerCase(),
    authType,
  });

  let proxyString = `country-${country.toLowerCase()}-session-${randomString(8)}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}-session-${randomString(8)}`;
  }

  if (asn) {
    proxyString += `-isp-${asn}`;
  }

  if (sessionDuration) {
    if (sessionDuration >= 60) {
      proxyString += `-lifetime-${Math.floor(sessionDuration / 60)}h`;
    } else {
      proxyString += `-lifetime-${sessionDuration}m`;
    }
  } else {
    proxyString += `-lifetime-1h`;
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateMOBILERotatingProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    password,
    country,
    domain,
    username,
    city,
    asn,
    proxyFormat,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    authType,
  } = input;
  const proxyPort = port ?? DEFAULT_MOBILE_PORT;
  const proxyEuPort = euPort ?? DEFAULT_MOBILE_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_MOBILE_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_MOBILE_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_MOBILE_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_MOBILE_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `${host}eu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `${host}asia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `${socksHost}eu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `${socksHost}asia`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    asiaHost: proxyAsiaHost,
    socksHost: socksHost,
    socksEuHost: proxySocksEuHost,
    socksAsiaHost: proxyAsiaSocksHost,
    port: proxyPort,
    euPort: proxyEuPort,
    asiaPort: proxyAsiaPort,
    socksPort: proxySocksPort,
    socksEuPort: proxyEuSocksPort,
    socksAsiaPort: proxyAsiaSocksPort,
    country: country.toLowerCase(),
    authType,
  });

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}`;
  }

  if (asn) {
    proxyString += `-isp-${asn}`;
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
