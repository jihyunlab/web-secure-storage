import init, { encrypt, decrypt } from './lib/wasm';

class Wasm {
  private static instance: Wasm;

  private constructor() {}

  public static async getInstance() {
    if (!Wasm.instance) {
      if (typeof window !== 'undefined') {
        await init();
      }

      Wasm.instance = new Wasm();
    }

    return Wasm.instance;
  }

  public crypto = {
    encrypt(text: string, secret: string, options?: { salt?: string; iterations?: number }) {
      let salt = '';
      let iterations = 128;

      if (options && options.salt) {
        salt = options.salt;
      }

      if (options && options.iterations !== undefined && options.iterations !== null && options.iterations > 0) {
        iterations = options.iterations;
      }

      return encrypt(text, secret, salt, iterations);
    },

    decrypt(text: string, secret: string, options?: { salt?: string; iterations?: number }) {
      let salt = '';
      let iterations = 128;

      if (options && options.salt) {
        salt = options.salt;
      }

      if (options && options.iterations !== undefined && options.iterations !== null && options.iterations > 0) {
        iterations = options.iterations;
      }

      return decrypt(text, secret, salt, iterations);
    },
  };
}

export default Wasm;
