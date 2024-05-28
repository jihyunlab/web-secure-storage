import Wasm from './wasm';

export function WebSecureStorage(secret: string, iterations = 128) {
  return {
    local: {
      clear: () => {
        localStorage.clear();
      },

      getItem: async (key: string) => {
        if (!key || key.length === 0) {
          throw new Error('key does not exist.');
        }

        const item = localStorage.getItem(key);

        if (!item || item.length === 0) {
          return item;
        }

        const wasm = await Wasm.getInstance();
        const decrypted = wasm.crypto.decrypt(item, secret, iterations);

        return decrypted;
      },

      setItem: async (key: string, item: string) => {
        if (!key || key.length === 0) {
          throw new Error('key does not exist.');
        }

        if (!item) {
          throw new Error('item does not exist.');
        }

        if (item.length === 0) {
          localStorage.setItem(key, item);
          return;
        }

        const wasm = await Wasm.getInstance();
        const encrypted = wasm.crypto.encrypt(item, secret, iterations);

        localStorage.setItem(key, encrypted);
      },

      removeItem: (key: string) => {
        if (!key || key.length === 0) {
          throw new Error('key does not exist.');
        }

        localStorage.removeItem(key);
      },
    },
  };
}
