export interface Cipher {
  encrypt: (secret: string, text: string) => Promise<string>;
  decrypt: (secret: string, text: string) => Promise<string>;
}

export interface CipherOptions {
  salt?: string;
  iterations?: number;
}
