import { LocalStorage } from './services/local-storage.service';
import { SessionStorage } from './services/session-storage.service';

export const STORAGE = {
  LOCAL: 'local',
  SESSION: 'session',
} as const;
export type STORAGE = (typeof STORAGE)[keyof typeof STORAGE];

export const create = (storage: STORAGE) => {
  switch (storage) {
    case STORAGE.LOCAL:
      return new LocalStorage();
    case STORAGE.SESSION:
      return new SessionStorage();
    default:
      throw new Error(`${storage} does not exist.`);
  }
};
