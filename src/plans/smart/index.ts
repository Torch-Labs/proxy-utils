import { ProxyConfig } from '../../@types';
import { randomString } from '../../utils';

const DEFAULT_SMART_PORT = '7000';

export const generateSmartStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, city, state, sessionDuration } = input;
  const proxyPort = port ?? DEFAULT_SMART_PORT;

  let proxyString = `country-${country.toLowerCase()}-session-${randomString(15)}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}-session-${randomString(15)}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}-session-${randomString(15)}`;
  }

  if (sessionDuration) {
    proxyString += `-sessionduration-${sessionDuration}`;
  }

  return `${host}.${domain}:${proxyPort}:user-${username}-${proxyString}:${password}`;
};

export const generateSmartRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, city, state } = input;
  const proxyPort = port ?? DEFAULT_SMART_PORT;

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}`;
  }

  return `${host}.${domain}:${proxyPort}:user-${username}-${proxyString}:${password}`;
};
