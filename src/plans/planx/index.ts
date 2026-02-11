import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

export const generatePlanXStickyProxies = (input: ProxyConfig) => {
  const { country, poolConfig, username, password, sessionDuration, city, state, deviceType, streaming, proxyFormat } =
    input;

  const { host, port, domain } = formatHostAndPort({ countryCode: country, poolConfig: poolConfig ?? [] });

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

  if (deviceType) {
    proxyString += `_device-${deviceType}`;
  }
  const part1 = `${host}.${domain}`;
  const part2 = `${port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generatePlanXRotatingProxies = (input: ProxyConfig) => {
  const { country, poolConfig, username, password, city, state, deviceType, streaming, proxyFormat } = input;

  const { host, port, domain, isCustom } = formatHostAndPort({ countryCode: country, poolConfig: poolConfig ?? [] });

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

  if (deviceType) {
    proxyString += `_device-${deviceType}`;
  }

  const part1 = `${host}.${domain}`;
  const part2 = `${port}`;
  const part3 = `${username}`;
  const part4 = isCustom ? `${password}` : `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
