import { WasmCipher } from './services/wasm-cipher.service';
import { CipherOptions } from './interfaces/cipher.interface';

export const CIPHER = {
  AES_256_GCM: 'aes-256-gcm',
} as const;
export type CIPHER = (typeof CIPHER)[keyof typeof CIPHER];

export const create = (cipher: CIPHER, options?: CipherOptions) => {
  switch (cipher) {
    case CIPHER.AES_256_GCM:
      return new WasmCipher('AES-256-GCM', options);
    default:
      throw new Error(`${cipher} does not exist.`);
  }
};
