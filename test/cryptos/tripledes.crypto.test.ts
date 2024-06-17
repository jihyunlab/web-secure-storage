import { CRYPTO, STORAGE, SecureStorage } from '../../src/index';

describe('TripleDES', () => {
  test('crypto', () => {
    const storage = SecureStorage(STORAGE.LOCAL, CRYPTO.TRIPLE_DES, 'key');

    storage.clear();
    storage.setItem('item', 'value');

    const value = storage.getItem('item');
    expect(value).toBe('value');

    storage.removeItem('item');
  });
});
