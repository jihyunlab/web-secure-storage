import * as crypto from 'crypto';

export const CRYPTO = {
  AES_128_CBC: 'aes-128-cbc',
  AES_192_CBC: 'aes-192-cbc',
  AES_256_CBC: 'aes-256-cbc',
  ARIA_128_CBC: 'aria-128-cbc',
  ARIA_192_CBC: 'aria-192-cbc',
  ARIA_256_CBC: 'aria-256-cbc',
  CAMELLIA_128_CBC: 'camellia-128-cbc',
  CAMELLIA_192_CBC: 'camellia-192-cbc',
  CAMELLIA_256_CBC: 'camellia-256-cbc',
} as const;
export type CRYPTO = (typeof CRYPTO)[keyof typeof CRYPTO];

export class Crypto {
  protected type;
  protected salt;
  private key;
  private rounds;

  constructor(type: CRYPTO, salt: string, key?: string, rounds?: number) {
    this.type = type;
    this.salt = salt;
    this.key = key;
    this.rounds = rounds;
  }

  protected generateKey = (bits: number): Buffer => {
    let key = this.key;
    let rounds = this.rounds;

    if (!key) {
      key = this.salt;
    }

    if (!rounds) {
      rounds = 4096;
    }

    return crypto.pbkdf2Sync(key, this.salt, rounds, bits / 8, 'sha256');
  };

  encrypt = (value: string): string => {
    throw new Error(value);
  };

  decrypt = (value: string): string => {
    throw new Error(value);
  };
}
