import { CipherCreator } from '../src/ciphers/cipher.creator';
import { WebSecureStorage, CIPHER, STORAGE } from '../src/index';
import { StorageCreator } from '../src/storages/storage.creator';

describe('Web secure storage', () => {
  test(`Positive: AES-256-GCM`, async () => {
    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    storage.clear();

    await storage.setItem('item', 'value');

    const item = await storage.getItem('item');
    storage.removeItem('item');

    expect(item).toBe('value');
  });

  test(`Positive: AES-256-GCM - empty item`, async () => {
    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    storage.clear();

    await storage.setItem('item', '');

    const item = await storage.getItem('item');
    storage.removeItem('item');

    expect(item).toBe('');
  });

  test(`Negative: clear() - storage does not exist.`, async () => {
    const spy = jest.spyOn(StorageCreator as any, 'create');
    spy.mockImplementation(() => {});

    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(() => {
      storage.clear();
    }).toThrow(Error('storage does not exist.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: getItem() - storage does not exist.`, async () => {
    const spy = jest.spyOn(StorageCreator as any, 'create');
    spy.mockImplementation(() => {});

    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(async () => {
      await storage.getItem('item');
    }).rejects.toThrow(Error('storage does not exist.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: setItem() - storage does not exist.`, async () => {
    const spy = jest.spyOn(StorageCreator as any, 'create');
    spy.mockImplementation(() => {});

    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(async () => {
      await storage.setItem('item', 'value');
    }).rejects.toThrow(Error('storage does not exist.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: removeItem() - storage does not exist.`, async () => {
    const spy = jest.spyOn(StorageCreator as any, 'create');
    spy.mockImplementation(() => {});

    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(() => {
      storage.removeItem('item');
    }).toThrow(Error('storage does not exist.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: getItem() - cipher does not exist.`, async () => {
    const spy = jest.spyOn(CipherCreator as any, 'create');
    spy.mockImplementation(() => {
      return null;
    });

    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(async () => {
      await storage.getItem('item');
    }).rejects.toThrow(Error('cipher does not exist.'));

    spy.mockReset();
    spy.mockRestore();
  });

  test(`Negative: setItem() - cipher does not exist.`, async () => {
    const spy = jest.spyOn(CipherCreator as any, 'create');
    spy.mockImplementation(() => {
      return null;
    });

    const storage = await WebSecureStorage.create(
      STORAGE.LOCAL,
      CIPHER.AES_256_GCM,
      'key'
    );

    expect(async () => {
      await storage.setItem('item', 'value');
    }).rejects.toThrow(Error('cipher does not exist.'));

    spy.mockReset();
    spy.mockRestore();
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
