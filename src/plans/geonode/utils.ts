import { AuthType, ProxyGenerationTypes, ProxyGenerationTypesConstant } from '../../@types';

const defaultPorts = { stickyPort: 10000, rotatingPort: 9000, socksStickyPort: 12000, socksRotatingPort: 11000 };

export const formatPort = (input: {
  authType?: AuthType;
  stickyPort?: number;
  rotatingPort?: number;
  socksStickyPort?: number;
  socksRotatingPort?: number;
  type: ProxyGenerationTypes;
}) => {
  const { authType, stickyPort, rotatingPort, socksStickyPort, socksRotatingPort, type } = input;

  if (type === ProxyGenerationTypesConstant.STICKY) {
    if (authType === AuthType.SOCKS5) {
      return socksStickyPort ?? defaultPorts.socksStickyPort;
    }

    return stickyPort ?? defaultPorts.stickyPort;
  }

  if (type === ProxyGenerationTypesConstant.ROTATING) {
    if (authType === AuthType.SOCKS5) {
      return socksRotatingPort ?? defaultPorts.socksRotatingPort;
    }

    return rotatingPort ?? defaultPorts.rotatingPort;
  }
};
