import CryptoJS from 'crypto-js';

export const STORAGE = {
  LOCAL: 'LOCAL',
  SESSION: 'SESSION',
} as const;
export type STORAGE = (typeof STORAGE)[keyof typeof STORAGE];

function SecureStorage(storage: string) {
  const getStorage = (storage: string): Storage => {
    switch (storage) {
      case STORAGE.LOCAL:
        return localStorage;
      case STORAGE.SESSION:
        return sessionStorage;
      default:
        return localStorage;
    }
  };

  const encrypt = (key: string, value: string, rounds?: number) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const hashedKey = CryptoJS.PBKDF2(key, salt, {
      keySize: 512 / 32,
      iterations: rounds ? rounds : 10000,
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encryptedValue = CryptoJS.AES.encrypt(value, hashedKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const encrypted = salt.toString() + iv.toString() + encryptedValue.toString();
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
  };

  const decrypt = (key: string, value: string, rounds?: number) => {
    const encrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(value));

    const salt = CryptoJS.enc.Hex.parse(encrypted.substring(0, 16 * 2));
    const iv = CryptoJS.enc.Hex.parse(encrypted.substring(16 * 2, 16 * 2));
    const encryptedValue = encrypted.substring(32 * 2);

    const hashedKey = CryptoJS.PBKDF2(key, salt, {
      keySize: 512 / 32,
      iterations: rounds ? rounds : 10000,
    });

    const decrypted = CryptoJS.AES.decrypt(encryptedValue, hashedKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return decrypted;
  };

  return {
    getItem: (key: string): string | null => {
      return getStorage(storage).getItem(key);
    },
    setItem: (key: string, value: string) => {
      getStorage(storage).setItem(key, value);
    },
  };
}
