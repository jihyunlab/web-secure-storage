import { CRYPTO, Crypto } from '../crypto';
import * as crypto from 'crypto';

export class AesCbcCrypto extends Crypto {
  IV_LENGTH = 16;

  constructor(type: CRYPTO, salt: string, key?: string, rounds?: number) {
    super(type, salt, key, rounds);
  }

  encrypt = (value: string): string => {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    let buffer: Buffer;

    switch (this.type) {
      case CRYPTO.AES_192_CBC:
        buffer = this.generateKey(192);
        break;
      case CRYPTO.AES_256_CBC:
        buffer = this.generateKey(256);
        break;
      case CRYPTO.AES_128_CBC:
      default:
        buffer = this.generateKey(128);
        break;
    }

    const cipher = crypto.createCipheriv(this.type, buffer, iv);
    const encrypted = cipher.update(value);

    return iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex');
  };

  decrypt = (value: string): string => {
    const ivString = value.split(':');
    const iv = Buffer.from(ivString.shift() || '', 'hex');
    let buffer: Buffer;

    switch (this.type) {
      case CRYPTO.AES_192_CBC:
        buffer = this.generateKey(192);
        break;
      case CRYPTO.AES_256_CBC:
        buffer = this.generateKey(256);
        break;
      case CRYPTO.AES_128_CBC:
      default:
        buffer = this.generateKey(128);
        break;
    }

    const encryptedValue = Buffer.from(ivString.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(this.type, buffer, iv);
    const decrypted = decipher.update(encryptedValue);

    return Buffer.concat([decrypted, decipher.final()]).toString();
  };
}
