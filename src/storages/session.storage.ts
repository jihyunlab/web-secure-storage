import { Storage } from '../interfaces/storage.interface';

export class SessionStorage implements Storage {
  public clear() {
    sessionStorage.clear();
  }

  public getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  public setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
}
