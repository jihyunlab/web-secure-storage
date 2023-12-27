import { CRYPTO, STORAGE, SecureStorage } from '../../src/index';

describe('Local', () => {
  test('storage', () => {
    const storage = SecureStorage(STORAGE.LOCAL, CRYPTO.AES, 'key', 128);

    storage.clear();
    storage.setItem('item', 'value');

    const value = storage.getItem('item');
    expect(value).toBe('value');

    storage.removeItem('item');
  });

  test('empty', () => {
    const storage = SecureStorage(STORAGE.LOCAL, CRYPTO.AES, 'key', 128);

    storage.clear();
    storage.setItem('item', '');

    const value = storage.getItem('item');
    expect(value).toBe('');
  });

  test('null', () => {
    const storage = SecureStorage(STORAGE.LOCAL, CRYPTO.AES, 'key', 128);

    storage.clear();
    const value = storage.getItem('item');
    expect(value).toBe(null);
  });
});
