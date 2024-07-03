import { Storage } from './storages/interfaces/storage.interface';
import { StorageCreator, STORAGE } from './storages/storage.creator';
import { Cipher, CipherOptions } from './ciphers/interfaces/cipher.interface';
import { CIPHER, CipherCreator } from './ciphers/cipher.creator';

export class WebSecureStorage {
  private storage?: Storage;
  private cipher?: Cipher;

  private constructor() {}

  public static async create(
    storage: STORAGE,
    cipher: CIPHER,
    secret: string,
    options?: CipherOptions
  ) {
    const instance = new WebSecureStorage();
    await instance.init(storage, cipher, secret, options);

    return instance;
  }

  private async init(
    storage: STORAGE,
    cipher: CIPHER,
    secret: string,
    options?: CipherOptions
  ) {
    this.storage = StorageCreator.create(storage);
    this.cipher = await CipherCreator.create(cipher, secret, options);
  }

  public clear() {
    if (!this.storage) {
      throw new Error('storage does not exist.');
    }

    this.storage.clear();
  }

  public async getItem(key: string) {
    if (!this.storage) {
      throw new Error('storage does not exist.');
    }

    if (!this.cipher) {
      throw new Error('cipher does not exist.');
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
    if (!this.storage) {
      throw new Error('storage does not exist.');
    }

    if (!this.cipher) {
      throw new Error('cipher does not exist.');
    }

    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    if (item === undefined || item === null) {
      throw new Error('item does not exist.');
    }

    if (item.length === 0) {
      this.storage.setItem(key, item);
      return;
    }

    this.storage.setItem(key, await this.cipher.encrypt(item));
  }

  public removeItem(key: string) {
    if (!this.storage) {
      throw new Error('storage does not exist.');
    }

    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    return this.storage.removeItem(key);
  }
}

export { STORAGE, CIPHER };
