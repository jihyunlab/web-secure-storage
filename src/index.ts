import { CRYPTO, getCrypto } from './crypto';
import { STORAGE, getStorage } from './storage';

export function SecureStorage(storage: STORAGE, crypto: CRYPTO, secret: string, rounds?: number) {
  return {
    clear: () => {
      getStorage(storage).clear();
    },
    getItem: (key: string) => {
      const value = getStorage(storage).getItem(key);

      if (!value || value.length === 0) {
        return value;
      }

      return getCrypto(crypto).decrypt(secret, value, rounds);
    },
    setItem: (key: string, value: string) => {
      if (!value) {
        return;
      }

      if (value.length === 0) {
        getStorage(storage).setItem(key, value);
      }

      getStorage(storage).setItem(key, getCrypto(crypto).encrypt(secret, value, rounds));
    },
    removeItem: (key: string) => {
      getStorage(storage).removeItem(key);
    },
  };
}

export { CRYPTO, STORAGE };
