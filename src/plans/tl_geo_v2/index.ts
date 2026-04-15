import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_TL_GEO_V2_PORT = 9000;
const DEFAULT_TL_GEO_V2_EU_PORT = 9001;
const DEFAULT_TL_GEO_V2_ASIA_PORT = 9002;
const DEFAULT_TL_GEO_V2_SOCKS_PORT = 9003;
const DEFAULT_TL_GEO_V2_EU_SOCKS_PORT = 9004;
const DEFAULT_TL_GEO_V2_ASIA_SOCKS_PORT = 9005;

export const generateTlGeoV2StickyProxies = (input: ProxyConfig) => {
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

  const proxyPort = port ?? DEFAULT_TL_GEO_V2_PORT;
  const proxyEuPort = euPort ?? DEFAULT_TL_GEO_V2_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_TL_GEO_V2_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_TL_GEO_V2_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_TL_GEO_V2_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_TL_GEO_V2_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `geonode.eu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `geonode.asia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `socksgeonode.eu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `socksgeonode.asia`;

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

  let proxyString = `country-${country.toLowerCase()}-session-${randomString(8)}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city.toLowerCase()}-session-${randomString(8)}`;
  }
  if (state) {
    if (city) {
      proxyString = `country-${country.toLowerCase()}-state-${state.toLowerCase()}-city-${city.toLowerCase()}-session-${randomString(
        8,
      )}`;
    } else {
      proxyString = `country-${country.toLowerCase()}-state-${state.toLowerCase()}-session-${randomString(8)}`;
    }
  }

  if (sessionDuration) {
    proxyString += `-lifetime-${sessionDuration}`;
  } else {
    proxyString += `-lifetime-60`;
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generateTlGeoV2RotatingProxies = (input: ProxyConfig) => {
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

  const proxyPort = port ?? DEFAULT_TL_GEO_V2_PORT;
  const proxyEuPort = euPort ?? DEFAULT_TL_GEO_V2_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_TL_GEO_V2_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_TL_GEO_V2_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_TL_GEO_V2_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_TL_GEO_V2_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `geonode.eu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `geonode.asia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `socksgeonode.eu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `socksgeonode.asia`;

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

  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city.toLowerCase()}`;
  }

  if (state) {
    if (city) {
      proxyString = `country-${country.toLowerCase()}-state-${state.toLowerCase()}-city-${city.toLowerCase()}`;
    } else {
      proxyString = `country-${country.toLowerCase()}-state-${state.toLowerCase()}`;
    }
  }

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
