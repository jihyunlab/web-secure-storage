import { Storage } from './interfaces/storage.interface';
import { LocalStorage } from './services/local-storage.service';
import { SessionStorage } from './services/session-storage.service';

export const STORAGE = {
  LOCAL: 'LOCAL',
  SESSION: 'SESSION',
} as const;
export type STORAGE = (typeof STORAGE)[keyof typeof STORAGE];

export const StorageCreator = {
  create(storage: STORAGE) {
    let instance: Storage;

    switch (storage) {
      case STORAGE.LOCAL:
        instance = new LocalStorage();
        break;
      case STORAGE.SESSION:
        instance = new SessionStorage();
        break;
      default:
        throw new Error(`${storage} does not exist.`);
    }

    return instance;
  },
};
