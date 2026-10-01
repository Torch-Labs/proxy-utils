import { ProxyConfig } from '../../@types';
import { formatProxyString, randomString } from '../../utils';
import { formatHostAndPort } from './utils';

const DEFAULT_SESSION_TIME_MINUTES = 60;
const MAX_SESSION_TIME_MINUTES = 1440;

const formatLocationValue = (value: string) => value.trim().toLowerCase().replace(/\s+/g, '_');

const buildLocationString = ({
  country,
  city,
  state,
  asn,
}: {
  country: string;
  city?: string;
  state?: string;
  asn?: string;
}) => {
  if (asn) {
    return `ASN-${asn.replace(/^as/i, '')}`;
  }
  const countryCode = country.toLowerCase() === 'uk' ? 'gb' : country.toLowerCase();

  let locationString = `cc-${countryCode.toUpperCase()}`;

  if (state) {
    // st carries the country itself, e.g. st-us_california
    const stateValue = formatLocationValue(state);
    locationString = `st-${stateValue.startsWith(`${countryCode}_`) ? stateValue : `${countryCode}_${stateValue}`}`;
  }

  if (city) {
    locationString += `-city-${formatLocationValue(city)}`;
  }

  return locationString;
};

const buildStickyProxyString = ({
  country,
  city,
  state,
  asn,
  deviceType,
  sessionDuration,
}: {
  country: string;
  city?: string;
  state?: string;
  asn?: string;
  deviceType?: string;
  sessionDuration?: number;
}) => {
  let proxyString = buildLocationString({ country, city, state, asn });

  if (deviceType) {
    proxyString += `-platform-${deviceType.toLowerCase()}`;
  }

  const sessionTime = sessionDuration
    ? Math.min(Math.max(Math.floor(sessionDuration), 1), MAX_SESSION_TIME_MINUTES)
    : DEFAULT_SESSION_TIME_MINUTES;

  return `${proxyString}-sessid-${randomString(8)}-sesstime-${sessionTime}`;
};

const buildRotatingProxyString = ({
  country,
  city,
  state,
  asn,
  deviceType,
}: {
  country: string;
  city?: string;
  state?: string;
  asn?: string;
  deviceType?: string;
}) => {
  let proxyString = buildLocationString({ country, city, state, asn });

  if (deviceType) {
    proxyString += `-platform-${deviceType.toLowerCase()}`;
  }

  return proxyString;
};

const buildIproyalStickyProxyString = ({
  country,
  city,
  state,
  asn,
  deviceType,
  sessionDuration,
  streaming,
  staticIps,
  pawn,
}: {
  country: string;
  city?: string;
  state?: string;
  asn?: string;
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
  if (asn) {
    proxyString += `_isp-${asn}`;
  }

  return proxyString;
};

const buildIproyalRotatingProxyString = ({
  country,
  city,
  state,
  asn,
  deviceType,
  streaming,
  staticIps,
  pawn,
}: {
  country: string;
  city?: string;
  state?: string;
  asn?: string;
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
  if (asn) {
    proxyString += `_isp-${asn}`;
  }

  return proxyString;
};

const DEFAULT_PRIVATEFAFO_PORT = 8501;
const DEFAULT_PRIVATEFAFO_EU_PORT = 8502;
const DEFAULT_PRIVATEFAFO_ASIA_PORT = 8503;
const DEFAULT_PRIVATEFAFO_SOCKS_PORT = 8504;
const DEFAULT_PRIVATEFAFO_EU_SOCKS_PORT = 8505;
const DEFAULT_PRIVATEFAFO_ASIA_SOCKS_PORT = 8506;

export const generatePrivatefafoStickyProxies = (input: ProxyConfig) => {
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
    asn,
    deviceType,
    streaming,
    staticIps,
    pawn,
    providerConfig,
  } = input;

  //

  const proxyPort = port ?? DEFAULT_PRIVATEFAFO_PORT;
  const proxyEuPort = euPort ?? DEFAULT_PRIVATEFAFO_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_PRIVATEFAFO_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_PRIVATEFAFO_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_PRIVATEFAFO_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_PRIVATEFAFO_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `privatefafoeu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `privatefafoasia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `privatefafoeu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `privatefafoasia`;

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

  const proxyString =
    providerConfig === 'iproyal_fafomix'
      ? buildIproyalStickyProxyString({
          country,
          city: city?.toLowerCase(),
          state: state?.toLowerCase(),
          asn,
          deviceType,
          sessionDuration,
          streaming,
          staticIps,
          pawn,
        })
      : buildStickyProxyString({
          country,
          city,
          state,
          asn,
          deviceType,
          sessionDuration,
        });

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};

export const generatePrivatefafoRotatingProxies = (input: ProxyConfig) => {
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
    asn,
    deviceType,
    streaming,
    staticIps,
    pawn,
    providerConfig,
  } = input;

  const proxyPort = port ?? DEFAULT_PRIVATEFAFO_PORT;
  const proxyEuPort = euPort ?? DEFAULT_PRIVATEFAFO_EU_PORT;
  const proxyAsiaPort = asiaPort ?? DEFAULT_PRIVATEFAFO_ASIA_PORT;
  const proxySocksPort = socksPort ?? DEFAULT_PRIVATEFAFO_SOCKS_PORT;
  const proxyEuSocksPort = socksEuPort ?? DEFAULT_PRIVATEFAFO_EU_SOCKS_PORT;
  const proxyAsiaSocksPort = socksAsiaPort ?? DEFAULT_PRIVATEFAFO_ASIA_SOCKS_PORT;

  const proxyEuHost = euHost ? euHost : `privatefafoeu`;
  const proxyAsiaHost = asiaHost ? asiaHost : `privatefafoasia`;
  const proxySocksEuHost = socksEuHost ? socksEuHost : `privatefafoeu`;
  const proxyAsiaSocksHost = socksAsiaHost ? socksAsiaHost : `privatefafoasia`;

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

  const proxyString =
    providerConfig === 'iproyal_fafomix'
      ? buildIproyalRotatingProxyString({
          country,
          city: city?.toLowerCase(),
          state: state?.toLowerCase(),
          asn,
          deviceType,
          streaming,
          staticIps,
          pawn,
        })
      : buildRotatingProxyString({
          country,
          city,
          state,
          asn,
          deviceType,
        });

  const part1 = `${formattedHostAndConfig.host}.${domain}`;
  const part2 = `${formattedHostAndConfig.port}`;
  const part3 = `${username}`;
  const part4 = `${password}-${proxyString}`;

  return formatProxyString({ part1, part2, part3, part4, proxyFormat });
};
