import { ProxyConfig } from '../../@types';
import { formatProxyString, randomNumberString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_IPROYAL_PORT = 12321;
const DEFAULT_IPROYAL_EU_PORT = 12323;
const DEFAULT_IPROYAL_ASIA_PORT = 12322;
const DEFAULT_IPROYAL_SOCKS_PORT = 12324;
const DEFAULT_IPROYAL_EU_SOCKS_PORT = 12326;
const DEFAULT_IPROYAL_ASIA_SOCKS_PORT = 12325;

export const generateIPRoyalStickyProxies = (input: ProxyConfig) => {
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
    state,
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
    streaming,
  } = input;

  const proxyPort = port ?? DEFAULT_IPROYAL_PORT;
  const proxyEuPort = euPort ?? DEFAULT_IPROYAL_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_IPROYAL_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_IPROYAL_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_IPROYAL_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_IPROYAL_ASIA_SOCKS_PORT;

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

  let proxyString = `country-${country.toLowerCase()}_session-${randomString(8)}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}_city-${city}_session-${randomString(8)}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}_state-${state}_session-${randomString(8)}`;
  }

  if (sessionDuration) {
    if (sessionDuration >= 60) {
      proxyString += `_lifetime-${Math.floor(sessionDuration / 60)}h`;
    } else {
      proxyString += `_lifetime-${sessionDuration}m`;
    }
  } else {
    proxyString += `_lifetime-1h`;
  }

  if (streaming) {
    proxyString += `_streaming-1`;
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateIPRoyalRotatingProxies = (input: ProxyConfig) => {
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
    state,
    proxyFormat,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    streaming,
    authType,
  } = input;
  const proxyPort = port ?? DEFAULT_IPROYAL_PORT;
  const proxyEuPort = euPort ?? DEFAULT_IPROYAL_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_IPROYAL_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_IPROYAL_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_IPROYAL_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_IPROYAL_ASIA_SOCKS_PORT;

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
    proxyString = `country-${country.toLowerCase()}_${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}_${state}`;
  }

  if (streaming) {
    proxyString += `_streaming-1`;
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
