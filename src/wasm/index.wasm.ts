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

  public cipher = {
    encrypt(text: string, secret: string, salt: string, iterations: number) {
      return encrypt(text, secret, salt, iterations);
    },

    decrypt(text: string, secret: string, salt: string, iterations: number) {
      return decrypt(text, secret, salt, iterations);
    },
  };
}
export default Wasm;
