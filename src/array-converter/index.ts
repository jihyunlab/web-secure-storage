import { HexConverter } from './converters/hex.converter';
import { Base64Converter } from './converters/base64.converter';
import { Base64UrlConverter } from './converters/base64url.converter';
import { Utf8Converter } from './converters/utf8.converter';

export class WebArrayConverter {
  private readonly uint8Array: Uint8Array;

  private constructor(uint8Array: Uint8Array) {
    this.uint8Array = uint8Array;
  }

  public static from(
    input: string | Uint8Array,
    encoding:
      | 'hex'
      | 'base64'
      | 'base64url'
      | 'utf8'
      | 'uint8array' = 'uint8array'
  ) {
    let uint8Array: Uint8Array | null;

    switch (encoding) {
      case 'hex':
        if (typeof input !== 'string') {
          throw new Error('encoding and input do not match.');
        }

        uint8Array = HexConverter.toUint8Array(input);
        break;
      case 'base64':
        if (typeof input !== 'string') {
          throw new Error('encoding and input do not match.');
        }

        uint8Array = Base64Converter.toUint8Array(input);
        break;
      case 'base64url':
        if (typeof input !== 'string') {
          throw new Error('encoding and input do not match.');
        }

        uint8Array = Base64UrlConverter.toUint8Array(input);
        break;
      case 'utf8':
        if (typeof input !== 'string') {
          throw new Error('encoding and input do not match.');
        }

        uint8Array = Utf8Converter.toUint8Array(input);
        break;
      default:
        if (!(input instanceof Uint8Array) || encoding !== 'uint8array') {
          throw new Error('encoding and input do not match.');
        }

        uint8Array = input;
        break;
    }

    if (!uint8Array) {
      throw new Error('encoding and input do not match.');
    }

    return new WebArrayConverter(uint8Array);
  }

  public toString(encoding: 'hex' | 'base64' | 'base64url' | 'utf8' = 'utf8') {
    switch (encoding) {
      case 'hex':
        return HexConverter.toHex(this.uint8Array);
      case 'base64':
        return Base64Converter.toBase64(this.uint8Array);
      case 'base64url':
        return Base64UrlConverter.toBase64Url(this.uint8Array);
      case 'utf8':
        return Utf8Converter.toUtf8(this.uint8Array);
    }
  }

  public toUint8Array() {
    return this.uint8Array;
  }
}
