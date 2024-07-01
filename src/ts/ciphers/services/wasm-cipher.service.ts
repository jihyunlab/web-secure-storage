import Wasm from '../../../wasm/index.wasm';
import { Cipher, CipherOptions } from '../interfaces/cipher.interface';

export class WasmCipher implements Cipher {
  private readonly name: string;
  private readonly options: CipherOptions;
  private key?: string;

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

  public async init(password: string, length: number) {
    const wasm = await Wasm.getInstance();

    this.key = await wasm.key.pbkdf2(
      password,
      length,
      this.options.salt || '',
      this.options.iterations || 128
    );
  }

  public async encrypt(text: string) {
    const wasm = await Wasm.getInstance();

    return await wasm.cipher.encrypt(this.name, text, this.key || '');
  }

  public async decrypt(text: string) {
    const wasm = await Wasm.getInstance();

    return await wasm.cipher.decrypt(this.name, text, this.key || '');
  }
}
