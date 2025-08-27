import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort, formatSsl } from './utils';

const DEFAULT_PACKETSTREAM_PORT = 31112;
const DEFAULT_PACKETSTREAM_EU_PORT = 31113;
const DEFAULT_PACKETSTREAM_ASIA_PORT = 31114;
const DEFAULT_PACKETSTREAM_SOCKS_PORT = 31115;
const DEFAULT_PACKETSTREAM_EU_SOCKS_PORT = 31116;
const DEFAULT_PACKETSTREAM_ASIA_SOCKS_PORT = 31117;

export const generatePacketstreamStickyProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    username,
    password,
    country,
    domain,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    ssl,
    proxyFormat,
    authType,
  } = input;

  const proxyPort = port ?? DEFAULT_PACKETSTREAM_PORT;
  const proxyEuPort = euPort ?? DEFAULT_PACKETSTREAM_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_PACKETSTREAM_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_PACKETSTREAM_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_PACKETSTREAM_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_PACKETSTREAM_ASIA_SOCKS_PORT;

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

  let proxyHost = formattedHostAndConfig.host;
  if (ssl) {
    const formattedSsl = formatSsl({ authType });
    proxyHost = `${formattedSsl}${proxyHost}`;
  }

  const part1 = `${proxyHost}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-country-${country}-session-${randomString(7)}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generatePacketstreamRotatingProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    username,
    password,
    country,
    domain,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    ssl,
    proxyFormat,
    authType,
  } = input;

  const proxyPort = port ?? DEFAULT_PACKETSTREAM_PORT;
  const proxyEuPort = euPort ?? DEFAULT_PACKETSTREAM_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_PACKETSTREAM_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_PACKETSTREAM_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_PACKETSTREAM_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_PACKETSTREAM_ASIA_SOCKS_PORT;

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
