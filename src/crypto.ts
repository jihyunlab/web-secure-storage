import { AesCrypto } from './cryptos/aes.crypto';
import { TripleDESCrypto } from './cryptos/tripledes.crypto';

export const CRYPTO = {
  AES: 'AES',
  TRIPLE_DES: 'TripleDES',
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
    case CRYPTO.TRIPLE_DES:
      return TripleDESCrypto;
  }
};
