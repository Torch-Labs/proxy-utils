import { PoolConfig } from '../../@types';
import { poolXCountries } from './countries';

export const defaultPoolConfig = [
  {
    name: 'USAX',
    host: 'usax',
    port: 6000,
  },
  {
    name: 'USATX',
    host: 'usatx',
    port: 6001,
  },
  {
    name: 'AUX',
    host: 'aux',
    port: 6002,
  },
  {
    name: 'UKX',
    host: 'ukx',
    port: 6003,
  },
  {
    name: 'UKCX',
    host: 'ukcx',
    port: 6004,
  },
  {
    name: 'UKVX',
    host: 'ukvx',
    port: 6005,
  },
  {
    name: 'DEX',
    host: 'dex',
    port: 6006,
  },
  {
    name: 'DEDX',
    host: 'dedx',
    port: 6007,
  },
  {
    name: 'NLX',
    host: 'nlx',
    port: 6008,
  },
  {
    name: 'NLDX',
    host: 'nldx',
    port: 6009,
  },
  {
    name: 'NLVX',
    host: 'nlvx',
    port: 6010,
  },
  {
    name: 'geox',
    host: 'geox',
    port: 6011,
  },
  {
    name: 'geoxeu',
    host: 'geoxeu',
    port: 6012,
  },
  {
    name: 'geoxasia',
    host: 'geoxasia',
    port: 6013,
  },
];

export const formatHostAndPort = (input: { countryCode: string; poolConfig: PoolConfig[] }) => {
  const { countryCode, poolConfig } = input;

  const countryInfo = poolXCountries.find((c) => c.code.toLowerCase() === countryCode.toLowerCase());
  if (!countryInfo) {
    throw new Error('Unsupported country');
  }
  const isCustom = countryInfo.isCustomCode;

  const poolInfo = poolConfig.find((p) => p.name.toLowerCase() === countryInfo.pool.toLowerCase());
  if (poolInfo) {
    return { host: poolInfo.host.toLowerCase(), domain: poolInfo.domain.toLowerCase(), port: poolInfo.port, isCustom };
  }
  const defaultPoolInfo = defaultPoolConfig.find((p) => p.name.toLowerCase() === countryInfo.pool.toLowerCase());
  if (!defaultPoolInfo) {
    throw new Error('Unsupported pool');
  }
  return { host: defaultPoolInfo.host.toLowerCase(), domain: 'x.proxiess.com', port: defaultPoolInfo.port, isCustom };
};
