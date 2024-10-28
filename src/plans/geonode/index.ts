import { ProxyConfig, ProxyGenerationTypesConstant } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatPort } from './utils';

export const generateGeonodeStickyProxies = (input: ProxyConfig) => {
  const {
    host,
    password,
    country,
    domain,
    username,
    city,
    state,
    sessionDuration,
    proxyFormat,
    stickyPort,
    rotatingPort,
    socksStickyPort,
    socksRotatingPort,
    authType,
  } = input;

  const proxyPort = formatPort({
    authType,
    stickyPort,
    rotatingPort,
    socksStickyPort,
    socksRotatingPort,
    type: ProxyGenerationTypesConstant.STICKY,
  });

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}`;
  }

  proxyString = `${proxyString}-session-${randomString(8)}`;

  if (sessionDuration) {
    proxyString += `-lifetime-${sessionDuration}`;
  } else {
    proxyString += `-lifetime-60`;
  }

  const part1 = `${host}.${domain}`;
  const part2 = `${proxyPort}`;
  const part3 = `${username}-${proxyString}`;
  const part4 = `${password}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateGeonodeRotatingProxies = (input: ProxyConfig) => {
  const {
    host,
    password,
    country,
    domain,
    username,
    city,
    state,
    proxyFormat,
    authType,
    stickyPort,
    rotatingPort,
    socksStickyPort,
    socksRotatingPort,
  } = input;

  const proxyPort = formatPort({
    authType,
    stickyPort,
    rotatingPort,
    socksStickyPort,
    socksRotatingPort,
    type: ProxyGenerationTypesConstant.ROTATING,
  });

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}`;
  }

  const part1 = `${host}.${domain}`;
  const part2 = `${proxyPort}`;
  const part3 = `${username}-${proxyString}`;
  const part4 = `${password}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
