import { ProxyConfig } from '../../@types';
import { formatProxyString, randomNumberString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

export const generatePlanXStickyProxies = (input: ProxyConfig) => {
  const { country, poolConfig, username, password, sessionDuration, city, state, streaming, proxyFormat } = input;

  const { host, port, domain } = formatHostAndPort({ countryCode: country, poolConfig: poolConfig ?? [] });

  let proxyString = `country-${country.toLowerCase()}-sessionid-${randomNumberString(8)}`;

  if (city) {
    proxyString = `city-${country.toLowerCase()}_${city}-sessionid-${randomNumberString(8)}`;
  }

  if (state) {
    proxyString = `state-${country.toLowerCase()}_${state}-sessionid-${randomNumberString(8)}`;
  }

  if (sessionDuration) {
    if (sessionDuration >= 60) {
      proxyString += ``;
    } else {
      proxyString += ``;
    }
  } else {
    proxyString += ``;
  }

  if (streaming) {
    proxyString += ``;
  }
  const part1 = `${host}.${domain}`;
  const part2 = `${port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generatePlanXRotatingProxies = (input: ProxyConfig) => {
  const { country, poolConfig, username, password, city, state, streaming, proxyFormat } = input;

  const { host, port, domain, isCustom } = formatHostAndPort({ countryCode: country, poolConfig: poolConfig ?? [] });

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `city-${country.toLowerCase()}_${city}`;
  }

  if (state) {
    proxyString = `state-${country.toLowerCase()}_${state}`;
  }

  if (streaming) {
    proxyString += ``;
  }
  const part1 = `${host}.${domain}`;
  const part2 = `${port}`;
  const part3 = `${username}`;
  const part4 = isCustom ? `${password}` : `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
