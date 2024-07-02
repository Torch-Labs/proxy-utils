import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_IPROYAL_PORT = 12321;
const DEFAULT_IPROYAL_EU_PORT = 12323;
const DEFAULT_IPROYAL_ASIA_PORT = 12322;

export const generateIPRoyalStickyProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    password,
    country,
    domain,
    port,
    username,
    state,
    city,
    sessionDuration,
    proxyFormat,
    euPort,
    asiaPort,
    streaming,
  } = input;
  const proxyPort = port ?? DEFAULT_IPROYAL_PORT;
  const proxyEuPort = euPort ?? DEFAULT_IPROYAL_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_IPROYAL_ASIA_PORT;
  const proxyEuHost = euHost ? euHost : `${host}eu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `${host}asia`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    asiaHost: proxyAsiaHost,
    port: proxyPort,
    euPort: proxyEuPort,
    asiaPort: proxyAsiaPort,
    country: country.toLowerCase(),
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
    password,
    country,
    domain,
    port,
    username,
    city,
    state,
    proxyFormat,
    euPort,
    streaming,
    asiaPort,
  } = input;
  const proxyPort = port ?? DEFAULT_IPROYAL_PORT;
  const proxyEuPort = euPort ?? DEFAULT_IPROYAL_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_IPROYAL_ASIA_PORT;
  const proxyEuHost = euHost ?? `${host}eu`;
  const proxyAsiaHost = euHost ?? `${host}asia`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    asiaHost: proxyAsiaHost,
    port: proxyPort,
    euPort: proxyEuPort,
    asiaPort: proxyAsiaPort,
    country: country.toLowerCase(),
  });

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}_city-${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}_state-${state}`;
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
