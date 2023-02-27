import { Storage } from '../storage';

export class LocalStorage implements Storage {
  clear = () => {
    localStorage.clear();
  };

  getItem = (key: string): string | null => {
    return localStorage.getItem(key);
  };

  setItem = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
}
