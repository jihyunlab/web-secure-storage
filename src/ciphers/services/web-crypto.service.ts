import { Cipher, CipherOptions } from '../interfaces/cipher.interface';
import { Key } from '../../helpers/key.helper';
import { Buffer } from '../../helpers/buffer.helper';

const crypto = globalThis.crypto;

export class WebCryptoCipher implements Cipher {
  private readonly cipher: string;
  private readonly ivLength: number;
  private readonly key: CryptoKey;
  private readonly tagLength?: number;
  private readonly additionalData?: ArrayBuffer;

  private constructor(
    cipher: string,
    key: CryptoKey,
    ivLength: number,
    tagLength?: number,
    additionalData?: ArrayBuffer
  ) {
    this.cipher = cipher;
    this.key = key;
    this.ivLength = ivLength;
    this.tagLength = tagLength;
    this.additionalData = additionalData;
  }

  public static async create(
    cipher: string,
    length: number,
    password: string,
    ivLength: number,
    tagLength?: number,
    additionalData?: ArrayBuffer,
    options?: CipherOptions
  ) {
    let salt = '';
    let iterations = 128;

    if (options && options.salt) {
      salt = options.salt;
    }

    if (
      options &&
      options.iterations !== undefined &&
      options.iterations !== null
    ) {
      iterations = options.iterations;
    }

    const key = await Key.pbkdf2(cipher, length, password, salt, iterations);

    const instance = new WebCryptoCipher(
      cipher,
      key,
      ivLength,
      tagLength,
      additionalData
    );

    return instance;
  }

  private params(
    name: string,
    iv: ArrayBuffer,
    tagLength?: number,
    additionalData?: ArrayBuffer
  ) {
    const params: {
      name: string;
      iv: ArrayBuffer;
      tagLength?: number;
      additionalData?: ArrayBuffer;
    } = {
      name: name,
      iv: iv,
    };

    if (tagLength !== undefined && tagLength !== null) {
      params['tagLength'] = tagLength;
    }

    if (additionalData) {
      params['additionalData'] = additionalData;
    }

    return params;
  }

  public async encrypt(text: string) {
    if (!this.key) {
      throw new Error('key does not exist.');
    }

    const textEncoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));

    const ciphertext = await crypto.subtle.encrypt(
      this.params(this.cipher, iv, this.tagLength, this.additionalData),
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
    const iv = Buffer.toUint8Array(text.substring(0, this.ivLength * 2));
    const ciphertext = Buffer.toUint8Array(text.substring(this.ivLength * 2));

    if (!iv) {
      throw new Error('iv conversion failed.');
    }

    if (!ciphertext) {
      throw new Error('ciphertext conversion failed.');
    }

    const plaintext = await crypto.subtle.decrypt(
      this.params(this.cipher, iv, this.tagLength, this.additionalData),
      this.key,
      ciphertext
    );

    return textDecoder.decode(plaintext);
  }
}
