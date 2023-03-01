import { Storage } from '../storage';

export const SessionStorage: Storage = {
  clear: () => {
    sessionStorage.clear();
  },
  getItem: (key: string) => {
    return sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
};
