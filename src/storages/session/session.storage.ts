import { Storage } from '../storage';

export class SessionStorage implements Storage {
  clear = () => {
    sessionStorage.clear();
  };

  getItem = (key: string): string | null => {
    return sessionStorage.getItem(key);
  };

  setItem = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  };

  removeItem = (key: string) => {
    sessionStorage.removeItem(key);
  };
}
