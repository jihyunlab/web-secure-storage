import { Crypto } from '../crypto';
import CryptoJS from 'crypto-js';

export const TripleDESCrypto: Crypto = {
  encrypt: (key: string, value: string, rounds?: number) => {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);

    const hashedKey = CryptoJS.PBKDF2(key, salt, {
      keySize: 256 / 32,
      iterations: rounds ? rounds : 128,
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);

    const encryptedValue = CryptoJS.TripleDES.encrypt(CryptoJS.enc.Utf8.parse(value), hashedKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    const encrypted = salt.toString() + iv.toString() + encryptedValue.toString();
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
  },

  decrypt: (key: string, value: string, rounds?: number) => {
    const encrypted = CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(value));

    const salt = CryptoJS.enc.Hex.parse(encrypted.substring(0, 32));
    const iv = CryptoJS.enc.Hex.parse(encrypted.substring(32, 64));
    const encryptedValue = encrypted.substring(64);

    const hashedKey = CryptoJS.PBKDF2(key, salt, {
      keySize: 256 / 32,
      iterations: rounds ? rounds : 128,
    });

    const decrypted = CryptoJS.TripleDES.decrypt(encryptedValue, hashedKey, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
  },
};
