import { CIPHER, CipherCreator } from '../../src/ciphers/cipher.creator';

describe('Cipher creator', () => {
  test(`Negative: create() - cipher does not exist.`, async () => {
    expect(async () => {
      await CipherCreator.create('cipher' as unknown as CIPHER, '');
    }).rejects.toThrow(Error('cipher does not exist.'));
  });
});
