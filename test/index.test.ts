import { WebSecureStorage, CIPHER, STORAGE } from '../src/index';

describe('Web secure storage', () => {
  test(`Positive: STORAGE.LOCAL, CIPHER.AES_256_CBC`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_CBC,
      'key'
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_CBC,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Positive: STORAGE.LOCAL, CIPHER.AES_256_CBC - empty value`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_CBC,
      'key'
    );

    storage.clear();

    await storage.setItem('item', '');

    storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_CBC,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('');
  });

  test(`Positive: STORAGE.LOCAL, CIPHER.AES_256_CBC - options`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_CBC,
      'key',
      { salt: 'salt', iterations: 128, ivLength: 16 }
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_CBC,
      'key',
      { salt: 'salt', iterations: 128, ivLength: 16 }
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Positive: STORAGE.SESSION, CIPHER.AES_256_CBC`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_CBC,
      'key'
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_CBC,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Positive: STORAGE.SESSION, CIPHER.AES_256_CBC - empty value`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_CBC,
      'key'
    );

    storage.clear();

    await storage.setItem('item', '');

    storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_CBC,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('');
  });

  test(`Positive: STORAGE.SESSION, CIPHER.AES_256_CBC - options`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_CBC,
      'key',
      { salt: 'salt', iterations: 128, ivLength: 16 }
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_CBC,
      'key',
      { salt: 'salt', iterations: 128, ivLength: 16 }
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Positive: STORAGE.LOCAL, CIPHER.AES_256_GCM`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Positive: STORAGE.LOCAL, CIPHER.AES_256_GCM - empty value`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    storage.clear();

    await storage.setItem('item', '');

    storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('');
  });

  test(`Positive: STORAGE.LOCAL, CIPHER.AES_256_GCM - options`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key',
      { salt: 'salt', iterations: 128, ivLength: 12 }
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key',
      { salt: 'salt', iterations: 128, ivLength: 12 }
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Positive: STORAGE.SESSION, CIPHER.AES_256_GCM`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_GCM,
      'key'
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_GCM,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Positive: STORAGE.SESSION, CIPHER.AES_256_GCM - empty value`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_GCM,
      'key'
    );

    storage.clear();

    await storage.setItem('item', '');

    storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_GCM,
      'key'
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('');
  });

  test(`Positive: STORAGE.SESSION, CIPHER.AES_256_GCM - options`, async () => {
    let storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_GCM,
      'key',
      {
        salt: 'salt',
        iterations: 128,
        ivLength: 12,
        tagLength: 128,
        additionalData: new Uint8Array([1, 2, 3, 4]),
      }
    );

    storage.clear();

    await storage.setItem('item', 'value');

    storage = await WebSecureStorage.create(
      STORAGE.SESSION,
      CIPHER.AES_256_GCM,
      'key',
      {
        salt: 'salt',
        additionalData: new Uint8Array([1, 2, 3, 4]),
      }
    );

    const value = await storage.getItem('item');
    storage.removeItem('item');

    expect(value).toBe('value');
  });

  test(`Negative: getItem() - key does not exist.`, async () => {
    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(async () => {
      await storage.getItem('');
    }).rejects.toThrow(Error('key does not exist.'));
  });

  test(`Negative: setItem() - key does not exist.`, async () => {
    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(async () => {
      await storage.setItem('', 'value');
    }).rejects.toThrow(Error('key does not exist.'));
  });

  test(`Negative: removeItem() - key does not exist.`, async () => {
    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(() => {
      storage.removeItem('');
    }).toThrow(Error('key does not exist.'));
  });

  test(`Negative: setItem() - item does not exist.`, async () => {
    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(async () => {
      await storage.setItem('item', undefined as unknown as string);
    }).rejects.toThrow(Error('item does not exist.'));
  });
});
