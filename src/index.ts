import {
  create as createStorage,
  STORAGE,
} from './ts/storages/storage.creator';
import { create as createCipher, CIPHER } from './ts/ciphers/cipher.creator';
import { Storage } from './ts/storages/interfaces/storage.interface';
import {
  Cipher,
  CipherOptions,
} from './ts/ciphers/interfaces/cipher.interface';

export class WebSecureStorage {
  readonly storage: Storage;
  readonly cipher: Cipher;

  constructor(storage: STORAGE, cipher: CIPHER, options?: CipherOptions) {
    this.storage = createStorage(storage);
    this.cipher = createCipher(cipher, options);
  }

  public async clear() {
    this.storage.clear();
  }

  public async getItem(secret: string, key: string) {
    if (!secret) {
      throw new Error('secret does not exist.');
    }

    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    const item = this.storage.getItem(key);

    if (!item || item.length === 0) {
      return item;
    }

    return await this.cipher.decrypt(secret, item);
  }

  public async setItem(secret: string, key: string, item: string) {
    if (!secret) {
      throw new Error('secret does not exist.');
    }

    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    if (!item) {
      throw new Error('item does not exist.');
    }

    if (item.length === 0) {
      this.storage.setItem(key, item);
      return;
    }

    this.storage.setItem(key, await this.cipher.encrypt(secret, item));
  }

  public async removeItem(key: string) {
    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    return this.storage.removeItem(key);
  }
}

export { STORAGE, CIPHER };
