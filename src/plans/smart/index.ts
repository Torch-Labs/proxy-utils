import { ProxyConfig } from '../../@types';
import { randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_SMART_PORT = 7000;

export const generateSmartStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, city, state, sessionDuration } = input;
  const proxyPort = port ?? DEFAULT_SMART_PORT;

  const formattedHostAndConfig = formatHostAndPort({ host, port: proxyPort, country: country.toLowerCase() });

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

  return `${formattedHostAndConfig.host}.${domain}:${formattedHostAndConfig.port}:${username}:${password}-${proxyString}`;
};

export const generateSmartRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, city, state } = input;
  const proxyPort = port ?? DEFAULT_SMART_PORT;

  const formattedHostAndConfig = formatHostAndPort({ host, port: proxyPort, country: country.toLowerCase() });

  let proxyString = `cc-${country.toLowerCase()}`;

  if (city) {
    proxyString = `cc-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `cc-${country.toLowerCase()}-state-${state}`;
  }

  return `${formattedHostAndConfig.host}.${domain}:${formattedHostAndConfig.port}:${username}:${password}-${proxyString}`;
};
