export interface Cipher {
  encrypt: (text: string) => Promise<string>;
  decrypt: (text: string) => Promise<string>;
}

export interface CipherOptions {
  salt?: string;
  iterations?: number;
}
