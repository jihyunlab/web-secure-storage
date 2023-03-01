import { AesCrypto } from './cryptos/aes.crypto';

export const CRYPTO = {
  AES: 'AES',
} as const;
export type CRYPTO = (typeof CRYPTO)[keyof typeof CRYPTO];

export interface Crypto {
  encrypt: (key: string, value: string, rounds?: number) => string;
  decrypt: (key: string, value: string, rounds?: number) => string;
}

export const getCrypto = (crypto: CRYPTO): Crypto => {
  switch (crypto) {
    case CRYPTO.AES:
      return AesCrypto;
  }
};
