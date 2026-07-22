import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_SMART_PORT = 7000;
const DEFAULT_SMART_EU_PORT = 7002;
const DEFAULT_SMART_ASIA_PORT = 7003;
const DEFAULT_SMART_SOCKS_PORT = 7004;
const DEFAULT_SMART_EU_SOCKS_PORT = 7005;
const DEFAULT_SMART_ASIA_SOCKS_PORT = 7006;

export const generateSmartStickyProxies = (input: ProxyConfig) => {
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
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    username,
    city,
    state,
    sessionDuration,
    proxyFormat,
    authType,
  } = input;

  const proxyPort = port ?? DEFAULT_SMART_PORT;
  const proxyEuPort = euPort ?? DEFAULT_SMART_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_SMART_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_SMART_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_SMART_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_SMART_ASIA_SOCKS_PORT;

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

export const generateSmartRotatingProxies = (input: ProxyConfig) => {
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
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    username,
    city,
    state,
    proxyFormat,
    authType,
  } = input;
  const proxyPort = port ?? DEFAULT_SMART_PORT;
  const proxyEuPort = euPort ?? DEFAULT_SMART_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_SMART_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_SMART_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_SMART_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_SMART_ASIA_SOCKS_PORT;

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
