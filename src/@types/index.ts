export type DefualtProxyConfig = {
  host: string;
  euHost?: string;
  asiaHost?: string;
  username?: string;
  password: string;
  domain: string;
  port?: number;
  euPort?: number;
  asiaPort?: number;
  state?: string;
  city?: string;
  sessionDuration?: number;
  ssl?: boolean;
  streaming?: boolean;
  proxyFormat: ProxyFormat;
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
} as const;

export type ProxyGenerationPlans = typeof ProxyGenerationPlansConstant[keyof typeof ProxyGenerationPlansConstant];

export enum ProxyFormat {
  DEFAULT = 'IP:PORT:USER:PASS',
  FORMAT_1 = 'USER:PASS:IP:PORT',
  FORMAT_2 = 'USER:PASS@IP:PORT',
}
