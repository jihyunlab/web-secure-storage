import { Cipher, CipherOptions } from './interfaces/cipher.interface';
import { WebCryptoCipher } from './services/web-crypto.service';

export const CIPHER = {
  AES_256_GCM: 'AES-256-GCM',
} as const;
export type CIPHER = (typeof CIPHER)[keyof typeof CIPHER];

export const CipherCreator = {
  async create(cipher: CIPHER, password: string, options?: CipherOptions) {
    let instance: Cipher;

    switch (cipher) {
      case CIPHER.AES_256_GCM:
        instance = await WebCryptoCipher.create(
          'AES-GCM',
          256,
          password,
          12,
          options
        );
        break;
      default:
        throw new Error(`${cipher} does not exist.`);
    }

    return instance;
  },
};