import { AuthType } from '../../@types';

export const smartCountryRegions = {
  us: [
    { country: 'USA', code: 'US' },
    { country: 'Canada', code: 'CA' },
  ],
  eu: [
    { country: 'GB', code: 'GB' },
    { country: 'Germany', code: 'DE' },
    { country: 'France', code: 'FR' },
    { country: 'Spain', code: 'ES' },
    { country: 'Italy', code: 'IT' },
    { country: 'Sweden', code: 'SE' },
    { country: 'Greece', code: 'GR' },
    { country: 'Portugal', code: 'PT' },
    { country: 'Netherlands', code: 'NL' },
    { country: 'Belgium', code: 'BE' },
    { country: 'Russia', code: 'RU' },
    { country: 'Ukraine', code: 'UA' },
    { country: 'Poland', code: 'PL' },
    { country: 'Israel', code: 'IL' },
    { country: 'Turkey', code: 'TR' },
    { country: 'Austria', code: 'AT' },
  ],
  asia: [
    { country: 'Australia', code: 'AU' },
    { country: 'Malaysia', code: 'MY' },
    { country: 'Thailand', code: 'TH' },
    { country: 'South Korea', code: 'KR' },
    { country: 'Japan', code: 'JP' },
    { country: 'Philippines', code: 'PH' },
    { country: 'Singapore', code: 'SG' },
    { country: 'China', code: 'CN' },
    { country: 'Hong Kong', code: 'HK' },
    { country: 'Taiwan', code: 'TW' },
    { country: 'India', code: 'IN' },
    { country: 'Pakistan', code: 'PK' },
    { country: 'Iran', code: 'IR' },
    { country: 'Indonesia', code: 'ID' },
    { country: 'Azerbaijan', code: 'AZ' },
    { country: 'Kazakhstan', code: 'KZ' },
    { country: 'UAE', code: 'AE' },
  ],
};
export const formatHostAndPort = (input: {
  country: string;
  host: string;
  euHost?: string;
  asiaHost?: string;
  socksHost?: string;
  socksEuHost?: string;
  socksAsiaHost?: string;
  port?: number;
  euPort?: number;
  asiaPort?: number;
  socksPort?: number;
  socksEuPort?: number;
  socksAsiaPort?: number;
  authType: AuthType | undefined;
}) => {
  const {
    country,
    host,
    euHost,
    asiaHost,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    authType,
  } = input;
  const isEuCountry = smartCountryRegions.eu.find((rgn) => rgn.code.toLowerCase() === country);

  if (isEuCountry) {
    if (authType === AuthType.SOCKS5) {
      return { host: socksEuHost, port: socksEuPort };
    }
    return { host: euHost, port: euPort };
  }

  const isAsiaCountry = smartCountryRegions.asia.find((rgn) => rgn.code.toLowerCase() === country);

  if (isAsiaCountry) {
    if (authType === AuthType.SOCKS5) {
      return { host: socksAsiaHost, port: socksAsiaPort };
    }
    return { host: asiaHost, port: asiaPort };
  }

  if (authType === AuthType.SOCKS5) {
    return { host: socksHost, port: socksPort };
  }

  return { host, port };
};
