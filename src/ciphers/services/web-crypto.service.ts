import { Cipher, CipherOptions } from '../interfaces/cipher.interface';
import { Key } from '../../helpers/key.helper';
import { Buffer } from '../../helpers/buffer.helper';

export class WebCryptoCipher implements Cipher {
  private cipher = 'AES-GCM';
  private ivLength = 12;
  private key?: CryptoKey;

  private constructor() {}

  public static async create(
    cipher: string,
    length: number,
    password: string,
    ivLength: number,
    options?: CipherOptions
  ) {
    const instance = new WebCryptoCipher();
    await instance.init(cipher, length, password, ivLength, options);

    return instance;
  }

  public async init(
    cipher: string,
    length: number,
    password: string,
    ivLength: number,
    options?: CipherOptions
  ) {
    this.cipher = cipher;
    this.key = await Key.pbkdf2(
      cipher,
      length,
      password,
      options?.salt || '',
      options?.iterations || 128
    );

    if (
      options &&
      options.ivLength !== undefined &&
      options.ivLength !== null &&
      options.ivLength > 0
    ) {
      this.ivLength = options.ivLength;
    } else {
      this.ivLength = ivLength;
    }
  }

  public async encrypt(text: string) {
    if (!this.key) {
      throw new Error('key does not exist.');
    }

    const textEncoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength || 16));

    const ciphertext = await crypto.subtle.encrypt(
      {
        name: this.cipher,
        iv: iv,
      },
      this.key,
      textEncoder.encode(text)
    );

    return Buffer.toHex(iv) + Buffer.toHex(ciphertext);
  }

  public async decrypt(text: string) {
    if (!this.key) {
      throw new Error('key does not exist.');
    }

    if (text.length <= this.ivLength * 2) {
      throw new Error('invalid text.');
    }

    const textDecoder = new TextDecoder();
    const iv = Buffer.toBuffer(text.substring(0, this.ivLength * 2));
    const ciphertext = Buffer.toBuffer(text.substring(this.ivLength * 2));

    if (!iv || !ciphertext) {
      throw new Error('data conversion failed.');
    }

    const plaintext = await crypto.subtle.decrypt(
      {
        name: this.cipher,
        iv: iv,
      },
      this.key,
      ciphertext
    );

    return textDecoder.decode(plaintext);
  }
}
