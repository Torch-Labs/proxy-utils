export type DefualtProxyConfig = {
  host: string;
  euHost?: string;
  asiaHost?: string;
  socksHost?: string;
  socksEuHost?: string;
  socksAsiaHost?: string;
  username?: string;
  password: string;
  domain?: string;
  port?: number;
  euPort?: number;
  asiaPort?: number;
  socksPort?: number;
  socksEuPort?: number;
  socksAsiaPort?: number;
  state?: string;
  city?: string;
  sessionDuration?: number;
  ssl?: boolean;
  streaming?: boolean;
  proxyFormat: ProxyFormat;
  authType?: AuthType;
  httpsPort?: number;
  stickyPort?: number;
  rotatingPort?: number;
  socksStickyPort?: number;
  socksRotatingPort?: number;
  poolConfig?: PoolConfig[];
};

export type PoolConfig = {
  name: string;
  host: string;
  port: number;
  domain: string;
};

export type ProxyConfig = DefualtProxyConfig & {
  country: string;
};

export type ProxyGenerationConfig = DefualtProxyConfig & {
  countryList: string[];
};

export const ProxyGenerationTypesConstant = {
  STICKY: 'STICKY',
  ROTATING: 'ROTATING',
} as const;

export type ProxyGenerationTypes = typeof ProxyGenerationTypesConstant[keyof typeof ProxyGenerationTypesConstant];

export const ProxyGenerationPlansConstant = {
  PACKETSTREAM: 'PACKETSTREAM',
  PRIVATE: 'PRIVATE',
  BRIGHTDATA: 'BRIGHTDATA',
  OXYLABS: 'OXYLABS',
  SMART: 'SMART',
  IPROYAL: 'IPROYAL',
  GEONODE: 'GEONODE',
  PLANX: 'PLANX',
} as const;

export type ProxyGenerationPlans = typeof ProxyGenerationPlansConstant[keyof typeof ProxyGenerationPlansConstant];

export enum ProxyFormat {
  DEFAULT = 'IP:PORT:USER:PASS',
  FORMAT_1 = 'USER:PASS:IP:PORT',
  FORMAT_2 = 'USER:PASS@IP:PORT',
}

export enum AuthType {
  HTTP = 'HTTP',
  HTTPS = 'HTTPS',
  SOCKS5 = 'SOCKS5',
  'HTTP/HTTPS' = 'HTTP/HTTPS',
}
