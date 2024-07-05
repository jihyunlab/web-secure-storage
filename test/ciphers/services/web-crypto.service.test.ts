import { WebCryptoCipher } from '../../../src/ciphers/services/web-crypto.service';
import { Key } from '../../../src/helpers/key.helper';
import { Buffer } from '../../../src/helpers/buffer.helper';

describe('Web crypto service', () => {
  test(`Negative: encrypt() - key does not exist.`, async () => {
    const spy = jest.spyOn(Key as any, 'pbkdf2');
    spy.mockImplementation(() => {
      return undefined;
    });

    const cipher = await WebCryptoCipher.create('AES-GCM', 256, 'password', 12);

    expect(async () => {
      await cipher.encrypt('text');
    }).rejects.toThrow(Error('key does not exist.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: decrypt() - key does not exist.`, async () => {
    const spy = jest.spyOn(Key as any, 'pbkdf2');
    spy.mockImplementation(() => {
      return undefined;
    });

    const cipher = await WebCryptoCipher.create('AES-GCM', 256, 'password', 12);

    expect(async () => {
      await cipher.decrypt('text');
    }).rejects.toThrow(Error('key does not exist.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: decrypt() - key does not exist.`, async () => {
    const cipher = await WebCryptoCipher.create('AES-GCM', 256, 'password', 12);

    expect(async () => {
      await cipher.decrypt('0');
    }).rejects.toThrow(Error('invalid text.'));
  });

  test(`Negative: decrypt() - iv conversion failed.`, async () => {
    const spy = jest.spyOn(Buffer as any, 'toUint8Array');
    spy.mockImplementation(() => {
      return undefined;
    });

    const cipher = await WebCryptoCipher.create('AES-GCM', 256, 'password', 12);

    expect(async () => {
      await cipher.decrypt('00000000000000000000000000000000');
    }).rejects.toThrow(Error('iv conversion failed.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: decrypt() - ciphertext conversion failed.`, async () => {
    const spy = jest.spyOn(Buffer as any, 'toUint8Array');
    spy
      .mockImplementationOnce(() => {
        return new Uint8Array(0);
      })
      .mockImplementationOnce(() => {
        return undefined;
      });

    const cipher = await WebCryptoCipher.create('AES-GCM', 256, 'password', 12);

    expect(async () => {
      await cipher.decrypt('00000000000000000000000000000000');
    }).rejects.toThrow(Error('ciphertext conversion failed.'));

    spy.mockReset();
    spy.mockRestore();
  });
});
