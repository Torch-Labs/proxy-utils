import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_BRIGHTDATA_PORT = 22225;
const DEFAULT_BRIGHTDATA_EU_PORT = 22226;
const DEFAULT_BRIGHTDATA_ASIA_PORT = 22227;
const DEFAULT_BRIGHTDATA_SOCKS_PORT = 22228;
const DEFAULT_BRIGHTDATA_EU_SOCKS_PORT = 22229;
const DEFAULT_BRIGHTDATA_ASIA_SOCKS_PORT = 22230;

export const generateBrightdataStickyProxies = (input: ProxyConfig) => {
  const {
    host,
    password,
    country,
    domain,
    port,
    username,
    proxyFormat,
    euPort,
    asiaPort,
    euHost,
    asiaHost,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    socksEuHost,
    socksAsiaHost,
    socksHost,
    authType,
  } = input;

  console.log(socksHost);

  const proxyPort = port ?? DEFAULT_BRIGHTDATA_PORT;
  const proxyEuPort = euPort ?? DEFAULT_BRIGHTDATA_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_BRIGHTDATA_ASIA_PORT;

  const proxySocksPort = socksPort ?? DEFAULT_BRIGHTDATA_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_BRIGHTDATA_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_BRIGHTDATA_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `${host}eu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `${host}asia`;

  const proxySocksEuHost = socksEuHost ? socksEuHost : `${socksHost}eu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `${host}asia`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    asiaHost: proxyAsiaHost,
    port: proxyPort,
    euPort: proxyEuPort,
    asiaPort: proxyAsiaPort,
    country: country.toLowerCase(),
    socksHost: socksHost,
    socksEuHost: proxySocksEuHost,
    socksAsiaHost: proxyAsiaSocksHost,
    socksPort: proxySocksPort,
    socksEuPort: proxyEuSocksPort,
    socksAsiaPort: proxyAsiaSocksPort,
    authType,
  });

  console.log(formattedHostAndConfig.port);

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-country-${country}-session-${randomString(15)}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateBrightdataRotatingProxies = (input: ProxyConfig) => {
  const {
    host,
    password,
    country,
    domain,
    port,
    username,
    proxyFormat,
    euPort,
    asiaPort,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    authType,
  } = input;

  const proxyPort = port ?? DEFAULT_BRIGHTDATA_PORT;
  const proxyEuPort = euPort ?? DEFAULT_BRIGHTDATA_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_BRIGHTDATA_ASIA_PORT;

  const proxySocksPort = socksPort ?? DEFAULT_BRIGHTDATA_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_BRIGHTDATA_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_BRIGHTDATA_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `${host}eu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `${host}asia`;

  const proxySocksEuHost = socksEuHost ? socksEuHost : `${socksHost}eu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `${socksHost}asia`;

  const formattedHostAndConfig = formatHostAndPort({
    host: host,
    euHost: proxyEuHost,
    asiaHost: proxyAsiaHost,
    port: proxyPort,
    euPort: proxyEuPort,
    asiaPort: proxyAsiaPort,
    country: country.toLowerCase(),
    socksHost: socksHost,
    socksEuHost: proxySocksEuHost,
    socksAsiaHost: proxyAsiaSocksHost,
    socksPort: proxySocksPort,
    socksEuPort: proxyEuSocksPort,
    socksAsiaPort: proxyAsiaSocksPort,
    authType,
  });

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-country-${country}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
