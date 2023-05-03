import { ProxyConfig } from '../../@types';
import { randomNumberString } from '../../utils';

const DEFAULT_ELITE_PORT = '7777';

export const generateOxylabsStickyProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, state, city, sessionDuration } = input;
  const proxyPort = port ?? DEFAULT_ELITE_PORT;

  let proxyString = `cc-${country.toLowerCase()}`;
  const sessionTime = sessionDuration ?? 30;

  if (state) {
    proxyString = `st-${state}`;
  }

  if (city) {
    proxyString = `cc-${country.toLowerCase()}-city-${city}`;
  }

  return `${host}.${domain}:${proxyPort}:${username}-${proxyString}-sessid-${randomNumberString(
    7,
  )}-sesstime-${sessionTime}:${password}`;
};

export const generateOxylabsRotatingProxies = (input: ProxyConfig) => {
  const { host, password, country, domain, port, username, city, state } = input;
  const proxyPort = port ?? DEFAULT_ELITE_PORT;

  let proxyString = `cc-${country.toLowerCase()}`;

  if (state) {
    proxyString = `st-${state}`;
  }

  if (city) {
    proxyString = `cc-${country.toLowerCase()}-city-${city}`;
  }

  return `${host}.${domain}:${proxyPort}:${username}-${proxyString}:${password}`;
};
