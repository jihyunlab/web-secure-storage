export const STORAGE = {
  LOCAL: 'local',
  SESSION: 'session',
} as const;
export type STORAGE = (typeof STORAGE)[keyof typeof STORAGE];

export interface Storage {
  clear: () => void;
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}
