export type DefualtProxyConfig = {
  host: string;
  username?: string;
  password: string;
  domain: string;
  port?: number;
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
} as const;

export type ProxyGenerationPlans = typeof ProxyGenerationPlansConstant[keyof typeof ProxyGenerationPlansConstant];
