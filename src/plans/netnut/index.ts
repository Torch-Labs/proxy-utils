import { ProxyConfig } from '../../@types';
import { formatProxyString, randomNumberString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_NETNUT_PORT = 6500;
const DEFAULT_NETNUT_EU_PORT = 6501;
const DEFAULT_NETNUT_ASIA_PORT = 6502;
const DEFAULT_NETNUT_SOCKS_PORT = 6503;
const DEFAULT_NETNUT_EU_SOCKS_PORT = 6504;
const DEFAULT_NETNUT_ASIA_SOCKS_PORT = 6505;

export const generateNetnutStickyProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    password,
    country,
    domain,
    username,
    state,
    city,
    sessionDuration,
    proxyFormat,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    authType,
    streaming,
  } = input;

  const proxyPort = port ?? DEFAULT_NETNUT_PORT;
  const proxyEuPort = euPort ?? DEFAULT_NETNUT_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_NETNUT_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_NETNUT_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_NETNUT_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_NETNUT_ASIA_SOCKS_PORT;

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

  let proxyString = `res-${country.toLowerCase()}-sid-${randomNumberString(8)}`;

  if (city) {
    proxyString = `res_sc-${country.toLowerCase()}_${city.toLowerCase()}-sid-${randomNumberString(8)}`;
  }
  if (state) {
    if (city) {
      proxyString = `res_sc-${country.toLowerCase()}_${state.toLowerCase()}_${city.toLowerCase()}-sid-${randomNumberString(
        8,
      )}`;
    } else {
      proxyString = `res_sc-${country.toLowerCase()}_${state.toLowerCase()}-sid-${randomNumberString(8)}`;
    }

    const part1 = `${formattedHostAndConfig.host}.${domain}`;
    const part2 = `${formattedHostAndConfig.port}`;
    const part3 = `${username}`;
    const part4 = `${password}-${proxyString}`;

    return formatProxyString({ part1, part2, part3, part4, proxyFormat });
  }
};

export const generateNetnutRotatingProxies = (input: ProxyConfig) => {
  const {
    host,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    password,
    country,
    domain,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    username,
    city,
    state,
    proxyFormat,
    authType,
  } = input;

  const proxyPort = port ?? DEFAULT_NETNUT_PORT;
  const proxyEuPort = euPort ?? DEFAULT_NETNUT_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_NETNUT_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_NETNUT_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_NETNUT_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_NETNUT_ASIA_SOCKS_PORT;

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

  let proxyString = `res-${country.toLowerCase()}`;

  if (city) {
    proxyString = `res_sc-${country.toLowerCase()}_${city.toLowerCase()}`;
  }

  if (state) {
    if (city) {
      proxyString = `res_sc-${country.toLowerCase()}_${state.toLowerCase()}_${city.toLowerCase()}`;
    } else {
      proxyString = `res_sc-${country.toLowerCase()}_${state.toLowerCase()}`;
    }
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
