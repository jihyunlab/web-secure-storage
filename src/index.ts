import Wasm from './wasm/index.wasm';
import { getStorage } from './ts/storages/index.storage';

export function WebSecureStorage(secret: string, options?: { salt?: string; iterations?: number }) {
  const clear = (storage: 'local' | 'session') => {
    getStorage(storage).clear();
  };

  const getItem = async (storage: 'local' | 'session', key: string) => {
    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    const item = getStorage(storage).getItem(key);

    if (!item || item.length === 0) {
      return item;
    }

    const wasm = await Wasm.getInstance();
    const decrypted = wasm.crypto.decrypt(item, secret, options);

    return decrypted;
  };

  const setItem = async (storage: 'local' | 'session', key: string, item: string) => {
    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    if (!item) {
      throw new Error('item does not exist.');
    }

    if (item.length === 0) {
      getStorage(storage).setItem(key, item);
      return;
    }

    const wasm = await Wasm.getInstance();
    const encrypted = wasm.crypto.encrypt(item, secret, options);

    getStorage(storage).setItem(key, encrypted);
  };

  const removeItem = (storage: 'local' | 'session', key: string) => {
    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    getStorage(storage).removeItem(key);
  };

  return {
    local: {
      clear: () => {
        clear('local');
      },

      getItem: async (key: string) => {
        return await getItem('local', key);
      },

      setItem: async (key: string, item: string) => {
        return await setItem('local', key, item);
      },

      removeItem: (key: string) => {
        removeItem('local', key);
      },
    },

    session: {
      clear: () => {
        clear('session');
      },

      getItem: async (key: string) => {
        return await getItem('session', key);
      },

      setItem: async (key: string, item: string) => {
        return await setItem('session', key, item);
      },

      removeItem: (key: string) => {
        removeItem('session', key);
      },
    },
  };
}
