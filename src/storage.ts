import { LocalStorage } from './storages/local.storage';
import { SessionStorage } from './storages/session.storage';

export const STORAGE = {
  LOCAL: 'LOCAL',
  SESSION: 'SESSION',
} as const;
export type STORAGE = (typeof STORAGE)[keyof typeof STORAGE];

export interface Storage {
  clear: () => void;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export const getStorage = (storage: STORAGE): Storage => {
  switch (storage) {
    case STORAGE.LOCAL:
      return LocalStorage;
    case STORAGE.SESSION:
      return SessionStorage;
  }
};
