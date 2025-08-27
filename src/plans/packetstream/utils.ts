import { AuthType } from '../../@types';

const DEFAULT_BASIC_PORT = '31112';
const DEFAULT_BASIC_HTTPS_PORT = '31111';
const DEFAULT_BASIC_SOCKS_PORT = '31113';

export const formatPort = (input: { authType?: AuthType; port?: number; httpsPort?: number; socksPort?: number }) => {
  const { authType, port, httpsPort, socksPort } = input;

  if (authType === AuthType.HTTPS) {
    return httpsPort ?? DEFAULT_BASIC_HTTPS_PORT;
  }

  if (authType === AuthType.SOCKS5) {
    return socksPort ?? DEFAULT_BASIC_SOCKS_PORT;
  }

  return port ?? DEFAULT_BASIC_PORT;
};

export const formatSsl = (input: { authType?: AuthType }) => {
  const { authType } = input;

  if (authType === AuthType.HTTPS) {
    return 'https://';
  }

  if (authType === AuthType.SOCKS5) {
    return 'socks5h://';
  }

  return 'http://';
};

// const packetStreamCountries = {
//   us: [
//     { name: 'Canada', country: 'Canada' },
//     { name: 'UnitedStates', country: 'United States' },
//     { name: 'Mexico', country: 'Mexico' },
//   ],
//   eu: [
//     { name: 'Albania', country: 'Albania' },
//     { name: 'Austria', country: 'Austria' },
//     { name: 'Belgium', country: 'Belgium' },
//     { name: 'BosniaandHerzegovina', country: 'Bosnia and Herzegovina' },
//     { name: 'Bulgaria', country: 'Bulgaria' },
//     { name: 'Croatia', country: 'Croatia' },
//     { name: 'Czechia', country: 'Czechia' },
//     { name: 'Denmark', country: 'Denmark' },
//     { name: 'Estonia', country: 'Estonia' },
//     { name: 'Finland', country: 'Finland' },
//     { name: 'France', country: 'France' },
//     { name: 'Germany', country: 'Germany' },
//     { name: 'Greece', country: 'Greece' },
//     { name: 'Hungary', country: 'Hungary' },
//     { name: 'Iceland', country: 'Iceland' },
//     { name: 'Ireland', country: 'Ireland' },
//     { name: 'Italy', country: 'Italy' },
//     { name: 'Latvia', country: 'Latvia' },
//     { name: 'Lithuania', country: 'Lithuania' },
//     { name: 'Luxembourg', country: 'Luxembourg' },
//     { name: 'Malta', country: 'Malta' },
//     { name: 'Netherlands', country: 'Netherlands' },
//     { name: 'Norway', country: 'Norway' },
//     { name: 'Poland', country: 'Poland' },
//     { name: 'Portugal', country: 'Portugal' },
//     { name: 'Romania', country: 'Romania' },
//     { name: 'Serbia', country: 'Serbia' },
//     { name: 'Slovakia', country: 'Slovakia' },
//     { name: 'Slovenia', country: 'Slovenia' },
//     { name: 'Spain', country: 'Spain' },
//     { name: 'Sweden', country: 'Sweden' },
//     { name: 'Switzerland', country: 'Switzerland' },
//     { name: 'UnitedKingdom', country: 'United Kingdom' },
//   ],
//   asia: [
//     { name: 'Afghanistan', country: 'Afghanistan' },
//     { name: 'Armenia', country: 'Armenia' },
//     { name: 'Azerbaijan', country: 'Azerbaijan' },
//     { name: 'Bahrain', country: 'Bahrain' },
//     { name: 'Bangladesh', country: 'Bangladesh' },
//     { name: 'Bhutan', country: 'Bhutan' },
//     { name: 'Brunei', country: 'Brunei' },
//     { name: 'Cambodia', country: 'Cambodia' },
//     { name: 'China', country: 'China' },
//     { name: 'Cyprus', country: 'Cyprus' },
//     { name: 'Georgia', country: 'Georgia' },
//     { name: 'India', country: 'India' },
//     { name: 'Indonesia', country: 'Indonesia' },
//     { name: 'Iran', country: 'Iran' },
//     { name: 'Iraq', country: 'Iraq' },
//     { name: 'Israel', country: 'Israel' },
//     { name: 'Japan', country: 'Japan' },
//     { name: 'Jordan', country: 'Jordan' },
//     { name: 'Kazakhstan', country: 'Kazakhstan' },
//     { name: 'Kuwait', country: 'Kuwait' },
//     { name: 'Kyrgyzstan', country: 'Kyrgyzstan' },
//     { name: 'Laos', country: 'Laos' },
//     { name: 'Lebanon', country: 'Lebanon' },
//     { name: 'Malaysia', country: 'Malaysia' },
//     { name: 'Maldives', country: 'Maldives' },
//     { name: 'Mongolia', country: 'Mongolia' },
//     { name: 'Myanmar', country: 'Myanmar' },
//     { name: 'Nepal', country: 'Nepal' },
//     { name: 'Oman', country: 'Oman' },
//     { name: 'Pakistan', country: 'Pakistan' },
//     { name: 'Palestine', country: 'Palestine' },
//     { name: 'Philippines', country: 'Philippines' },
//     { name: 'Qatar', country: 'Qatar' },
//     { name: 'SaudiArabia', country: 'Saudi Arabia' },
//     { name: 'Singapore', country: 'Singapore' },
//     { name: 'SouthKorea', country: 'South Korea' },
//     { name: 'SriLanka', country: 'Sri Lanka' },
//     { name: 'Syria', country: 'Syria' },
//     { name: 'Taiwan', country: 'Taiwan' },
//     { name: 'Tajikistan', country: 'Tajikistan' },
//     { name: 'Thailand', country: 'Thailand' },
//     { name: 'Timor-Leste', country: 'Timor-Leste' },
//     { name: 'Turkey', country: 'Turkey' },
//     { name: 'Turkmenistan', country: 'Turkmenistan' },
//     { name: 'UnitedArabEmirates', country: 'United Arab Emirates' },
//     { name: 'Uzbekistan', country: 'Uzbekistan' },
//     { name: 'Vietnam', country: 'Vietnam' },
//     { name: 'Yemen', country: 'Yemen' },
//   ],
// };
export const packetStreamCountries = {
  us: [
    { code: 'CA', country: 'Canada' },
    { code: 'US', country: 'United States' },
    { code: 'MX', country: 'Mexico' },
  ],
  eu: [
    { code: 'AD', country: 'Andorra' },
    { code: 'AL', country: 'Albania' },
    { code: 'AM', country: 'Armenia' },
    { code: 'AT', country: 'Austria' },
    { code: 'AZ', country: 'Azerbaijan' },
    { code: 'BA', country: 'Bosnia and Herzegovina' },
    { code: 'BE', country: 'Belgium' },
    { code: 'BG', country: 'Bulgaria' },
    { code: 'BY', country: 'Belarus' },
    { code: 'CH', country: 'Switzerland' },
    { code: 'CY', country: 'Cyprus' },
    { code: 'CZ', country: 'Czech Republic' },
    { code: 'DE', country: 'Germany' },
    { code: 'DK', country: 'Denmark' },
    { code: 'EE', country: 'Estonia' },
    { code: 'ES', country: 'Spain' },
    { code: 'FI', country: 'Finland' },
    { code: 'FR', country: 'France' },
    { code: 'GE', country: 'Georgia' },
    { code: 'GR', country: 'Greece' },
    { code: 'HR', country: 'Croatia' },
    { code: 'HU', country: 'Hungary' },
    { code: 'IE', country: 'Ireland' },
    { code: 'IT', country: 'Italy' },
    { code: 'LT', country: 'Lithuania' },
    { code: 'LU', country: 'Luxembourg' },
    { code: 'LV', country: 'Latvia' },
    { code: 'MD', country: 'Moldova, Republic of' },
    { code: 'ME', country: 'Montenegro' },
    { code: 'MK', country: 'Macedonia, the Former Yugoslav Republic of' },
    { code: 'MT', country: 'Malta' },
    { code: 'NL', country: 'Netherlands' },
    { code: 'NO', country: 'Norway' },
    { code: 'PL', country: 'Poland' },
    { code: 'PT', country: 'Portugal' },
    { code: 'RO', country: 'Romania' },
    { code: 'RS', country: 'Serbia' },
    { code: 'RU', country: 'Russian Federation' },
    { code: 'SE', country: 'Sweden' },
    { code: 'SI', country: 'Slovenia' },
    { code: 'SK', country: 'Slovakia' },
    { code: 'SM', country: 'San Marino' },
    { code: 'UA', country: 'Ukraine' },
    { code: 'GB', country: 'United Kingdom' },
    { code: 'JE', country: 'Jersey' },
    { code: 'GG', country: 'Guernsey' },
    { code: 'IM', country: 'Isle of Man' },
  ],
  asia: [
    { code: 'AE', country: 'United Arab Emirates' },
    { code: 'AF', country: 'Afghanistan' },
    { code: 'AM', country: 'Armenia' },
    { code: 'AZ', country: 'Azerbaijan' },
    { code: 'BD', country: 'Bangladesh' },
    { code: 'BH', country: 'Bahrain' },
    { code: 'BN', country: 'Brunei Darussalam' },
    { code: 'BT', country: 'Bhutan' },
    { code: 'CN', country: 'China' },
    { code: 'CY', country: 'Cyprus' },
    { code: 'GE', country: 'Georgia' },
    { code: 'HK', country: 'Hong Kong' },
    { code: 'ID', country: 'Indonesia' },
    { code: 'IN', country: 'India' },
    { code: 'IQ', country: 'Iraq' },
    { code: 'IR', country: 'Iran, Islamic Republic of' },
    { code: 'IL', country: 'Israel' },
    { code: 'JP', country: 'Japan' },
    { code: 'JO', country: 'Jordan' },
    { code: 'KG', country: 'Kyrgyzstan' },
    { code: 'KH', country: 'Cambodia' },
    { code: 'KR', country: 'Korea, Republic of' },
    { code: 'KW', country: 'Kuwait' },
    { code: 'KZ', country: 'Kazakhstan' },
    { code: 'LA', country: "Lao People's Democratic Republic" },
    { code: 'LB', country: 'Lebanon' },
    { code: 'LK', country: 'Sri Lanka' },
    { code: 'MM', country: 'Myanmar' },
    { code: 'MN', country: 'Mongolia' },
    { code: 'MO', country: 'Macao' },
    { code: 'MY', country: 'Malaysia' },
    { code: 'MV', country: 'Maldives' },
    { code: 'NP', country: 'Nepal' },
    { code: 'OM', country: 'Oman' },
    { code: 'PH', country: 'Philippines' },
    { code: 'PK', country: 'Pakistan' },
    { code: 'PS', country: 'Palestine, State of' },
    { code: 'QA', country: 'Qatar' },
    { code: 'SA', country: 'Saudi Arabia' },
    { code: 'SG', country: 'Singapore' },
    { code: 'SY', country: 'Syrian Arab Republic' },
    { code: 'TH', country: 'Thailand' },
    { code: 'TJ', country: 'Tajikistan' },
    { code: 'TM', country: 'Turkmenistan' },
    { code: 'TW', country: 'Taiwan, Province of China' },
    { code: 'UZ', country: 'Uzbekistan' },
    { code: 'VN', country: 'Viet Nam' },
    { code: 'YE', country: 'Yemen' },
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
  const isEuCountry = packetStreamCountries.eu.find((rgn) => rgn.code.toLowerCase() === country);

  if (isEuCountry) {
    if (authType === AuthType.SOCKS5) {
      return { host: socksEuHost, port: socksEuPort };
    }
    return { host: euHost, port: euPort };
  }

  const isAsiaCountry = packetStreamCountries.asia.find((rgn) => rgn.code.toLowerCase() === country);

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
