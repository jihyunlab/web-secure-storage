import { Storage } from '../interfaces/storage.interface';

export class LocalStorage implements Storage {
  public clear() {
    localStorage.clear();
  }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
