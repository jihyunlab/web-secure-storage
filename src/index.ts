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

export const WebSecureStorage = {
  create: async (
    storage: STORAGE,
    cipher: CIPHER,
    password: string,
    options?: CipherOptions
  ) => {
    const impl = new WebSecureStorageImpl();

    await impl.init(storage, cipher, password, options);
    return impl;
  },
};

class WebSecureStorageImpl {
  private storage?: Storage;
  private cipher?: Cipher;

  public async init(
    storage: STORAGE,
    cipher: CIPHER,
    password: string,
    options?: CipherOptions
  ) {
    this.storage = createStorage(storage);
    this.cipher = await createCipher(cipher, password, options);
  }

  public async clear() {
    if (!this.storage) {
      throw new Error('class not initialized.');
    }

    this.storage.clear();
  }

  public async getItem(key: string) {
    if (!this.storage || !this.cipher) {
      throw new Error('class not initialized.');
    }

    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    const item = this.storage.getItem(key);

    if (!item || item.length === 0) {
      return item;
    }

    return await this.cipher.decrypt(item);
  }

  public async setItem(key: string, item: string) {
    if (!this.storage || !this.cipher) {
      throw new Error('class not initialized.');
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

    this.storage.setItem(key, await this.cipher.encrypt(item));
  }

  public async removeItem(key: string) {
    if (!this.storage) {
      throw new Error('class not initialized.');
    }

    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    return this.storage.removeItem(key);
  }
}

export { STORAGE, CIPHER };
