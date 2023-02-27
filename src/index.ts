import { Crypto, CRYPTO } from './cryptos/crypto';
import { CryptoFactory } from './cryptos/crypto.factory';
import { Storage, STORAGE } from './storages/storage';
import { StorageFactory } from './storages/storage.factory';

export const SecureStorageFactory = (
  storage: STORAGE,
  salt: string,
  crypto?: CRYPTO,
  key?: string,
  rounds?: number
): SecureStorage => {
  return new SecureStorage(StorageFactory(storage), CryptoFactory(crypto || CRYPTO.AES_128_CBC, salt, key, rounds));
};

export class SecureStorage {
  private storage;
  private crypto;

  constructor(storage: Storage, crypto: Crypto) {
    this.storage = storage;
    this.crypto = crypto;
  }

  clear = () => {
    this.storage.clear();
  };

  getItem = (key: string): string | null => {
    const value = this.storage.getItem(key);

    if (!value) {
      return value;
    }

    return this.crypto.decrypt(value);
  };

  setItem = (key: string, value: string) => {
    this.storage.setItem(key, this.crypto.encrypt(value));
  };

  removeItem = (key: string) => {
    this.storage.removeItem(key);
  };
}

export { CRYPTO, STORAGE };
