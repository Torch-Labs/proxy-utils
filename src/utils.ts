import { ProxyFormat } from './@types';

export const randomString = (length: number) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const randomNumberString = (length: number) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatProxyString = (input: {
  part1: string;
  part2: string;
  part3: string;
  part4: string;
  proxyFormat: ProxyFormat;
}): string => {
  const { part1, part2, part3, part4, proxyFormat } = input;

  switch (proxyFormat) {
    case ProxyFormat.DEFAULT:
      return `${part1}:${part2}:${part3}:${part4}`;
    case ProxyFormat.FORMAT_1:
      return `${part3}:${part4}:${part1}:${part2}`;
    case ProxyFormat.FORMAT_2:
      return `${part3}:${part4}@${part1}:${part2}`;
    default:
      throw new Error('Unsupported format');
  }
};
