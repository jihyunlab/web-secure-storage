import {
  CIPHER,
  Cipher,
  CipherOptions,
  createCipher,
} from '@jihyunlab/web-crypto';
import { WebBuffer } from '@jihyunlab/web-buffer';
import { STORAGE, Storage } from './interfaces/storage.interface';
import { StorageCreator } from './storages/storage.creator';

export class WebSecureStorage {
  private readonly storage: Storage;
  private readonly cipher: Cipher;

  private constructor(storage: Storage, cipher: Cipher) {
    this.storage = storage;
    this.cipher = cipher;
  }

  public static async create(
    storage: STORAGE,
    cipher: CIPHER,
    secret: string,
    options?: CipherOptions
  ) {
    const instance = new WebSecureStorage(
      StorageCreator.create(storage),
      await createCipher(cipher, secret, options)
    );

    return instance;
  }

  public clear() {
    this.storage.clear();
  }

  public async getItem(key: string) {
    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    const item = this.storage.getItem(key);

    if (!item || item.length === 0) {
      return item;
    }

    const decrypted = await this.cipher.decrypt(item);
    const buffer = WebBuffer.from(decrypted, 'uint8array');

    return buffer.toString('utf8');
  }

  public async setItem(key: string, item: string) {
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

    const encrypted = await this.cipher.encrypt(item);
    const buffer = WebBuffer.from(encrypted, 'uint8array');

    this.storage.setItem(key, buffer.toString('hex'));
  }

  public removeItem(key: string) {
    if (!key || key.length === 0) {
      throw new Error('key does not exist.');
    }

    return this.storage.removeItem(key);
  }
}

export { CIPHER, STORAGE, CipherOptions };
