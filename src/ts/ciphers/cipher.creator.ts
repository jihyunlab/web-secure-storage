import { WasmCipher } from './services/wasm-cipher.service';
import { CipherOptions } from './interfaces/cipher.interface';

export const CIPHER = {
  AES_256_GCM: 'aes-256-gcm',
} as const;
export type CIPHER = (typeof CIPHER)[keyof typeof CIPHER];

export const create = async (
  cipher: CIPHER,
  password: string,
  options?: CipherOptions
) => {
  let wasmCipher: WasmCipher;
  let length: number;

  switch (cipher) {
    case CIPHER.AES_256_GCM:
      wasmCipher = new WasmCipher('AES-256-GCM', options);
      length = 256;
      break;
    default:
      throw new Error(`${cipher} does not exist.`);
  }

  await wasmCipher.init(password, length);
  return wasmCipher;
};
