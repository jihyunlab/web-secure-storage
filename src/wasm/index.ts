import init from './lib';

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
    encrypt(text: string, secret: string, iterations: number) {
      return '';
    },

    decrypt(text: string, secret: string, iterations: number) {
      return '';
    },
  };
}

export default Wasm;
