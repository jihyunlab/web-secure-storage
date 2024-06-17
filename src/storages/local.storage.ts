import { Storage } from '../storage';

export const LocalStorage: Storage = {
  clear: () => {
    localStorage.clear();
  },

  getItem: (key: string) => {
    return localStorage.getItem(key);
  },

  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};
