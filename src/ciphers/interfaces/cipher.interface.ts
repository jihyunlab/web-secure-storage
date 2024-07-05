export interface Cipher {
  encrypt: (text: string) => Promise<string>;
  decrypt: (text: string) => Promise<string>;
}

export interface CipherOptions {
  salt?: string;
  iterations?: number;
  ivLength?: number;
  tagLength?: 32 | 64 | 96 | 104 | 112 | 120 | 128;
  additionalData?: ArrayBuffer;
}
