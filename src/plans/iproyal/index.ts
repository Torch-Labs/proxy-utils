import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_IPROYAL_PORT = 12321;
const DEFAULT_IPROYAL_EU_PORT = 12323;

export const generateIPRoyalStickyProxies = (input: ProxyConfig) => {
  const {
    host,
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
    streaming,
  } = input;
  const proxyPort = port ?? DEFAULT_IPROYAL_PORT;
  const proxyEuPort = euPort ?? DEFAULT_IPROYAL_EU_PORT;

  const formattedHostAndConfig = formatHostAndPort({
    host,
    port: proxyPort,
    euPort: proxyEuPort,
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
  const { host, password, country, domain, port, username, city, state, proxyFormat, euPort, streaming } = input;
  const proxyPort = port ?? DEFAULT_IPROYAL_PORT;
  const proxyEuPort = euPort ?? DEFAULT_IPROYAL_EU_PORT;

  const formattedHostAndConfig = formatHostAndPort({
    host,
    port: proxyPort,
    euPort: proxyEuPort,
    country: country.toLowerCase(),
  });

  let proxyString = `cc-${country.toLowerCase()}`;

  if (city) {
    proxyString = `cc-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `cc-${country.toLowerCase()}-state-${state}`;
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
