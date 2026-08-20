import { AuthType, PoolConfig } from '../../@types';
import { poolXCountries } from './countries';

export const defaultPoolConfig = [
  {
    name: 'USAX',
    host: 'usax',
    port: 6000,
    authType: AuthType.HTTP,
  },
  {
    name: 'USATX',
    host: 'usatx',
    port: 6001,
    authType: AuthType.HTTP,
  },
  {
    name: 'AUX',
    host: 'aux',
    port: 6002,
    authType: AuthType.HTTP,
  },
  {
    name: 'UKX',
    host: 'ukx',
    port: 6003,
    authType: AuthType.HTTP,
  },
  {
    name: 'UKCX',
    host: 'ukcx',
    port: 6004,
    authType: AuthType.HTTP,
  },
  {
    name: 'UKVX',
    host: 'ukvx',
    port: 6005,
    authType: AuthType.HTTP,
  },
  {
    name: 'DEX',
    host: 'dex',
    port: 6006,
    authType: AuthType.HTTP,
  },
  {
    name: 'DEDX',
    host: 'dedx',
    port: 6007,
    authType: AuthType.HTTP,
  },
  {
    name: 'NLX',
    host: 'nlx',
    port: 6008,
    authType: AuthType.HTTP,
  },
  {
    name: 'NLDX',
    host: 'nldx',
    port: 6009,
    authType: AuthType.HTTP,
  },
  {
    name: 'NLVX',
    host: 'nlvx',
    port: 6010,
    authType: AuthType.HTTP,
  },
  {
    name: 'CAX',
    host: 'cax',
    port: 6017,
    authType: AuthType.HTTP,
  },
  {
    name: 'geox',
    host: 'geox',
    port: 6011,
    authType: AuthType.HTTP,
  },
  {
    name: 'geoxeu',
    host: 'geoxeu',
    port: 6012,
    authType: AuthType.HTTP,
  },
  {
    name: 'geoxasia',
    host: 'geoxasia',
    port: 6013,
    authType: AuthType.HTTP,
  },
  {
    name: 'socksgeox',
    host: 'socksgeox',
    port: 6014,
    authType: AuthType.SOCKS5,
  },
  {
    name: 'socksgeoxeu',
    host: 'socksgeoxeu',
    port: 6015,
    authType: AuthType.SOCKS5,
  },
  {
    name: 'socksgeoxasia',
    host: 'socksgeoxasia',
    port: 6016,
    authType: AuthType.SOCKS5,
  },
];

export const formatHostAndPort = (input: { countryCode: string; poolConfig: PoolConfig[]; authType: AuthType }) => {
  const { countryCode, poolConfig, authType } = input;

  const countryInfo = poolXCountries.find((c) => c.code.toLowerCase() === countryCode.toLowerCase());
  if (!countryInfo) {
    throw new Error('Unsupported country');
  }
  const isCustom = countryInfo.isCustomCode;

  const poolInfo = poolConfig.find(
    (p) => p.name.toLowerCase() === countryInfo.pool.toLowerCase() && p.authType === authType,
  );
  if (poolInfo) {
    return { host: poolInfo.host.toLowerCase(), domain: poolInfo.domain.toLowerCase(), port: poolInfo.port, isCustom };
  }
  const defaultPoolInfo = defaultPoolConfig.find(
    (p) => p.name.toLowerCase() === countryInfo.pool.toLowerCase() && p.authType === authType,
  );
  if (!defaultPoolInfo) {
    throw new Error('Unsupported pool');
  }
  return { host: defaultPoolInfo.host.toLowerCase(), domain: 'x.proxiess.com', port: defaultPoolInfo.port, isCustom };
};
