import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const zipHostsAndPorts = (host: string | undefined, port: number | string | undefined) => {
  const hosts = String(host ?? '')
    .split(',')
    .map((h) => h.trim());
  const ports = String(port ?? '')
    .split(',')
    .map((p) => p.trim());

  return hosts.map((h, index) => ({ host: h, port: ports[index] ?? ports[0] }));
};

const buildBrdStickyProxyString = ({
  country,
  city,
  state,
  deviceType,
}: {
  country: string;
  city?: string;
  state?: string;
  deviceType?: string;
}) => {
  let proxyString = `country-${country.toLowerCase()}-session-${randomString(15)}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}-session-${randomString(15)}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}-session-${randomString(15)}`;
  }

  if (deviceType) {
    proxyString += `-os-${deviceType}`;
  }

  return proxyString;
};

const buildBrdRotatingProxyString = ({
  country,
  city,
  state,
  deviceType,
}: {
  country: string;
  city?: string;
  state?: string;
  deviceType?: string;
}) => {
  let proxyString = `country-${country.toLowerCase()}`;

  if (city) {
    proxyString = `country-${country.toLowerCase()}-city-${city}`;
  }

  if (state) {
    proxyString = `country-${country.toLowerCase()}-state-${state}`;
  }

  if (deviceType) {
    proxyString += `-os-${deviceType}`;
  }

  return proxyString;
};

const buildIproyalStickyProxyString = ({
  country,
  city,
  state,
  deviceType,
  sessionDuration,
  streaming,
  staticIps,
  pawn,
}: {
  country: string;
  city?: string;
  state?: string;
  deviceType?: string;
  sessionDuration?: number;
  streaming?: boolean;
  staticIps?: boolean;
  pawn?: boolean;
}) => {
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
  if (staticIps) {
    proxyString += `_skipispstatic-1`;
  }
  if (pawn) {
    proxyString += `_direct-1`;
  }
  if (deviceType) {
    proxyString += `_device-${deviceType}`;
  }

  return proxyString;
};

const buildIproyalRotatingProxyString = ({
  country,
  city,
  state,
  deviceType,
  streaming,
  staticIps,
  pawn,
}: {
  country: string;
  city?: string;
  state?: string;
  deviceType?: string;
  streaming?: boolean;
  staticIps?: boolean;
  pawn?: boolean;
}) => {
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
  if (staticIps) {
    proxyString += `_skipispstatic-1`;
  }
  if (pawn) {
    proxyString += `_direct-1`;
  }
  if (deviceType) {
    proxyString += `_device-${deviceType}`;
  }

  return proxyString;
};

const DEFAULT_MIXEDFAFO_PORT = 61114;
const DEFAULT_MIXEDFAFO_EU_PORT = 61115;
const DEFAULT_MIXEDFAFO_ASIA_PORT = 61116;
const DEFAULT_MIXEDFAFO_SOCKS_PORT = 61114;
const DEFAULT_MIXEDFAFO_EU_SOCKS_PORT = 61115;
const DEFAULT_MIXEDFAFO_ASIA_SOCKS_PORT = 61116;

export const generateMixedfafoStickyProxies = (input: ProxyConfig) => {
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
    staticIps,
    pawn,
    deviceType,
  } = input;

  //

  const proxyPort = port ?? DEFAULT_MIXEDFAFO_PORT;
  const proxyEuPort = euPort ?? DEFAULT_MIXEDFAFO_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_MIXEDFAFO_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_MIXEDFAFO_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_MIXEDFAFO_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_MIXEDFAFO_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `mixedfofaeu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `mixedfofaasia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `mixedfofaeu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `mixedfofaasia`;

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

  const hostAndPortPairs = zipHostsAndPorts(formattedHostAndConfig.host, formattedHostAndConfig.port);

  return hostAndPortPairs.map(({ host: pairHost, port: pairPort }, index) => {
    const proxyString =
      index > 0
        ? buildBrdStickyProxyString({
            country,
            city: city?.toLowerCase(),
            state: state?.toLowerCase(),
            deviceType,
          })
        : buildIproyalStickyProxyString({
            country,
            city: city?.toLowerCase(),
            state: state?.toLowerCase(),
            deviceType,
            sessionDuration,
            streaming,
            staticIps,
            pawn,
          });

    const part1 = `${pairHost}.${domain}`;
    const part2 = `${pairPort}`;
    const part3 = `${username}`;
    const part4 = `${password}-${proxyString}`;

    return formatProxyString({ part1, part2, part3, part4, proxyFormat });
  });
};

export const generateMixedfafoRotatingProxies = (input: ProxyConfig) => {
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
    streaming,
    staticIps,
    pawn,
    deviceType,
  } = input;

  const proxyPort = port ?? DEFAULT_MIXEDFAFO_PORT;
  const proxyEuPort = euPort ?? DEFAULT_MIXEDFAFO_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_MIXEDFAFO_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_MIXEDFAFO_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_MIXEDFAFO_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_MIXEDFAFO_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `mixedfofaeu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `mixedfofaasia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `mixedfofaeu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `mixedfofaasia`;

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

  const hostAndPortPairs = zipHostsAndPorts(formattedHostAndConfig.host, formattedHostAndConfig.port);

  return hostAndPortPairs.map(({ host: pairHost, port: pairPort }, index) => {
    const proxyString =
      index > 0
        ? buildBrdRotatingProxyString({
            country,
            city: city?.toLowerCase(),
            state: state?.toLowerCase(),
            deviceType,
          })
        : buildIproyalRotatingProxyString({
            country,
            city: city?.toLowerCase(),
            state: state?.toLowerCase(),
            deviceType,
            streaming,
            staticIps,
            pawn,
          });

    const part1 = `${pairHost}.${domain}`;
    const part2 = `${pairPort}`;
    const part3 = `${username}`;
    const part4 = `${password}-${proxyString}`;

    return formatProxyString({ part1, part2, part3, part4, proxyFormat });
  });
};
