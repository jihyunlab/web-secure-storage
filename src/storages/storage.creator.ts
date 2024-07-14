import { STORAGE, Storage } from '../interfaces/storage.interface';
import { LocalStorage } from './local.storage';
import { SessionStorage } from './session.storage';

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
