import Wasm from '../../../wasm/index.wasm';
import { Cipher, CipherOptions } from '../interfaces/cipher.interface';

export class WasmCipher implements Cipher {
  readonly name: string;
  readonly options: CipherOptions;

  constructor(name: string, options?: CipherOptions) {
    this.name = name;
    this.options = { salt: '', iterations: 128 };

    if (options && options.salt) {
      this.options.salt = options.salt;
    }

    if (
      options &&
      options.iterations !== undefined &&
      options.iterations !== null &&
      options.iterations > 0
    ) {
      this.options.iterations = options.iterations;
    }
  }

  public async encrypt(secret: string, text: string) {
    const wasm = await Wasm.getInstance();

    return await wasm.cipher.encrypt(
      text,
      secret,
      this.options.salt || '',
      this.options.iterations || 128
    );
  }

  public async decrypt(secret: string, text: string) {
    const wasm = await Wasm.getInstance();

    return await wasm.cipher.decrypt(
      text,
      secret,
      this.options.salt || '',
      this.options.iterations || 128
    );
  }
}
