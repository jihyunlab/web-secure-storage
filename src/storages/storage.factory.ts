import { STORAGE, Storage } from './storage';

import { LocalStorage } from './local/local.storage';
import { SessionStorage } from './session/session.storage';

export const StorageFactory = (storage: STORAGE): Storage => {
  switch (storage) {
    case STORAGE.LOCAL:
      return new LocalStorage();
    case STORAGE.SESSION:
      return new SessionStorage();
  }
};
