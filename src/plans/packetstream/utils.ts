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

const packetStreamCountries = {
  us: [
    { name: 'Canada', country: 'Canada' },
    { name: 'UnitedStates', country: 'United States' },
    { name: 'Mexico', country: 'Mexico' },
  ],
  eu: [
    { name: 'Albania', country: 'Albania' },
    { name: 'Austria', country: 'Austria' },
    { name: 'Belgium', country: 'Belgium' },
    { name: 'BosniaandHerzegovina', country: 'Bosnia and Herzegovina' },
    { name: 'Bulgaria', country: 'Bulgaria' },
    { name: 'Croatia', country: 'Croatia' },
    { name: 'Czechia', country: 'Czechia' },
    { name: 'Denmark', country: 'Denmark' },
    { name: 'Estonia', country: 'Estonia' },
    { name: 'Finland', country: 'Finland' },
    { name: 'France', country: 'France' },
    { name: 'Germany', country: 'Germany' },
    { name: 'Greece', country: 'Greece' },
    { name: 'Hungary', country: 'Hungary' },
    { name: 'Iceland', country: 'Iceland' },
    { name: 'Ireland', country: 'Ireland' },
    { name: 'Italy', country: 'Italy' },
    { name: 'Latvia', country: 'Latvia' },
    { name: 'Lithuania', country: 'Lithuania' },
    { name: 'Luxembourg', country: 'Luxembourg' },
    { name: 'Malta', country: 'Malta' },
    { name: 'Netherlands', country: 'Netherlands' },
    { name: 'Norway', country: 'Norway' },
    { name: 'Poland', country: 'Poland' },
    { name: 'Portugal', country: 'Portugal' },
    { name: 'Romania', country: 'Romania' },
    { name: 'Serbia', country: 'Serbia' },
    { name: 'Slovakia', country: 'Slovakia' },
    { name: 'Slovenia', country: 'Slovenia' },
    { name: 'Spain', country: 'Spain' },
    { name: 'Sweden', country: 'Sweden' },
    { name: 'Switzerland', country: 'Switzerland' },
    { name: 'UnitedKingdom', country: 'United Kingdom' },
  ],
  asia: [
    { name: 'Afghanistan', country: 'Afghanistan' },
    { name: 'Armenia', country: 'Armenia' },
    { name: 'Azerbaijan', country: 'Azerbaijan' },
    { name: 'Bahrain', country: 'Bahrain' },
    { name: 'Bangladesh', country: 'Bangladesh' },
    { name: 'Bhutan', country: 'Bhutan' },
    { name: 'Brunei', country: 'Brunei' },
    { name: 'Cambodia', country: 'Cambodia' },
    { name: 'China', country: 'China' },
    { name: 'Cyprus', country: 'Cyprus' },
    { name: 'Georgia', country: 'Georgia' },
    { name: 'India', country: 'India' },
    { name: 'Indonesia', country: 'Indonesia' },
    { name: 'Iran', country: 'Iran' },
    { name: 'Iraq', country: 'Iraq' },
    { name: 'Israel', country: 'Israel' },
    { name: 'Japan', country: 'Japan' },
    { name: 'Jordan', country: 'Jordan' },
    { name: 'Kazakhstan', country: 'Kazakhstan' },
    { name: 'Kuwait', country: 'Kuwait' },
    { name: 'Kyrgyzstan', country: 'Kyrgyzstan' },
    { name: 'Laos', country: 'Laos' },
    { name: 'Lebanon', country: 'Lebanon' },
    { name: 'Malaysia', country: 'Malaysia' },
    { name: 'Maldives', country: 'Maldives' },
    { name: 'Mongolia', country: 'Mongolia' },
    { name: 'Myanmar', country: 'Myanmar' },
    { name: 'Nepal', country: 'Nepal' },
    { name: 'Oman', country: 'Oman' },
    { name: 'Pakistan', country: 'Pakistan' },
    { name: 'Palestine', country: 'Palestine' },
    { name: 'Philippines', country: 'Philippines' },
    { name: 'Qatar', country: 'Qatar' },
    { name: 'SaudiArabia', country: 'Saudi Arabia' },
    { name: 'Singapore', country: 'Singapore' },
    { name: 'SouthKorea', country: 'South Korea' },
    { name: 'SriLanka', country: 'Sri Lanka' },
    { name: 'Syria', country: 'Syria' },
    { name: 'Taiwan', country: 'Taiwan' },
    { name: 'Tajikistan', country: 'Tajikistan' },
    { name: 'Thailand', country: 'Thailand' },
    { name: 'Timor-Leste', country: 'Timor-Leste' },
    { name: 'Turkey', country: 'Turkey' },
    { name: 'Turkmenistan', country: 'Turkmenistan' },
    { name: 'UnitedArabEmirates', country: 'United Arab Emirates' },
    { name: 'Uzbekistan', country: 'Uzbekistan' },
    { name: 'Vietnam', country: 'Vietnam' },
    { name: 'Yemen', country: 'Yemen' },
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
}) => {
  const { country, host, euHost, asiaHost, port, euPort, asiaPort } = input;
  const isEuCountry = packetStreamCountries.eu.find((rgn) => rgn.name.toLowerCase() === country);

  if (isEuCountry) {
    return { host: euHost, port: euPort };
  }

  const isAsiaCountry = packetStreamCountries.asia.find((rgn) => rgn.name.toLowerCase() === country);

  if (isAsiaCountry) {
    return { host: asiaHost, port: asiaPort };
  }

  return { host, port };
};
