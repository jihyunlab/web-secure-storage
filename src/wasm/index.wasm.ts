import init, { encrypt, decrypt, pbkdf2 } from './lib/wasm';

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
    encrypt(cipher: string, text: string, key: string) {
      return encrypt(cipher, text, key);
    },

    decrypt(cipher: string, text: string, key: string) {
      return decrypt(cipher, text, key);
    },
  };

  public key = {
    pbkdf2(password: string, length: number, salt: string, iterations: number) {
      return pbkdf2(password, length, salt, iterations);
    },
  };
}

export default Wasm;
