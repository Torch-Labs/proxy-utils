import { AuthType } from '../../@types';

export const brightdataCountryRegions = {
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
  euHost: string;
  asiaHost: string;
  port: number;
  euPort: number;
  asiaPort: number;
  socksHost?: string;
  socksEuHost?: string;
  socksAsiaHost?: string;
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
    port,
    euPort,
    asiaPort,
    socksPort,
    socksEuPort,
    socksAsiaPort,
    socksHost,
    socksEuHost,
    socksAsiaHost,
    authType,
  } = input;
  const isEuCountry = brightdataCountryRegions.eu.find((rgn) => rgn.code.toLowerCase() === country);

  if (isEuCountry) {
    if (authType === AuthType.SOCKS5) {
      return { host: socksEuHost, port: socksEuPort };
    }
    return { host: euHost, port: euPort };
  }

  const isAsiaCountry = brightdataCountryRegions.asia.find((rgn) => rgn.code.toLowerCase() === country);

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
