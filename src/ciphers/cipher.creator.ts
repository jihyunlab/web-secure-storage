import { Cipher, CipherOptions } from './interfaces/cipher.interface';
import { WebCryptoCipher } from './services/web-crypto.service';

export const CIPHER = {
  AES_256_CBC: 'AES-256-CBC',
  AES_256_GCM: 'AES-256-GCM',
} as const;
export type CIPHER = (typeof CIPHER)[keyof typeof CIPHER];

export const CipherCreator = {
  async create(cipher: CIPHER, password: string, options?: CipherOptions) {
    let instance: Cipher;

    let ivLength: number | undefined;
    let tagLength: number | undefined;
    let additionalData: ArrayBuffer | undefined;

    if (
      options &&
      options.ivLength !== undefined &&
      options.ivLength !== null
    ) {
      ivLength = options.ivLength;
    }

    if (
      options &&
      options.tagLength !== undefined &&
      options.tagLength !== null
    ) {
      tagLength = options.tagLength;
    }

    if (options && options.additionalData) {
      additionalData = options.additionalData;
    }

    switch (cipher) {
      case CIPHER.AES_256_CBC:
        instance = await WebCryptoCipher.create(
          'AES-CBC',
          256,
          password,
          ivLength !== undefined ? ivLength : 16,
          undefined,
          undefined,
          options
        );
        break;
      case CIPHER.AES_256_GCM:
        instance = await WebCryptoCipher.create(
          'AES-GCM',
          256,
          password,
          ivLength !== undefined ? ivLength : 12,
          tagLength || 128,
          additionalData,
          options
        );
        break;
      default:
        throw new Error(`${cipher} does not exist.`);
    }

    return instance;
  },
};
