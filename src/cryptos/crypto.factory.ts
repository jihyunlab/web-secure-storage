import { CRYPTO, Crypto } from './crypto';
import { AesCbcCrypto } from './aes/aes.crypto';
import { AriaCbcCrypto } from './aria/aria.crypto';
import { CamelliaCbcCrypto } from './camellia/camellia.crypto';

export const CryptoFactory = (crypto: CRYPTO, salt: string, key?: string, rounds?: number): Crypto => {
  switch (crypto) {
    case CRYPTO.AES_128_CBC:
    case CRYPTO.AES_192_CBC:
    case CRYPTO.AES_256_CBC:
      return new AesCbcCrypto(crypto, salt, key, rounds);
    case CRYPTO.ARIA_128_CBC:
    case CRYPTO.ARIA_192_CBC:
    case CRYPTO.ARIA_256_CBC:
      return new AriaCbcCrypto(crypto, salt, key, rounds);
    case CRYPTO.CAMELLIA_128_CBC:
    case CRYPTO.CAMELLIA_192_CBC:
    case CRYPTO.CAMELLIA_256_CBC:
      return new CamelliaCbcCrypto(crypto, salt, key, rounds);
  }
};
