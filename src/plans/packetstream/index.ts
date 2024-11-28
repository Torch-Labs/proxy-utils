import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort, formatSsl } from './utils';

const DEFAULT_IPROYAL_PORT = 31112;
const DEFAULT_IPROYAL_EU_PORT = 31113;
const DEFAULT_IPROYAL_ASIA_PORT = 31114;

export const generatePacketstreamStickyProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    username,
    password,
    country,
    domain,
    port,
    euPort,
    asiaPort,
    ssl,
    proxyFormat,
    authType,
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

  let proxyHost = formattedHostAndConfig.host;
  if (ssl) {
    const formattedSsl = formatSsl({ authType });
    proxyHost = `${formattedSsl}${proxyHost}`;
  }

  const part1 = `${proxyHost}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-country-${country}_session-${randomString(7)}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generatePacketstreamRotatingProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    username,
    password,
    country,
    domain,
    port,
    euPort,
    asiaPort,
    ssl,
    proxyFormat,
    authType,
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

  let proxyHost = formattedHostAndConfig.host;
  if (ssl) {
    const formattedSsl = formatSsl({ authType });
    proxyHost = `${formattedSsl}${proxyHost}`;
  }

  const part1 = `${proxyHost}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-country-${country}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
