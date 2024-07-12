import { STORAGE } from '../../src/storages/interfaces/storage.interface';
import { StorageCreator } from '../../src/storages/storage.creator';

describe('Storage creator', () => {
  test(`Negative: create() - storage does not exist.`, async () => {
    expect(() => {
      StorageCreator.create('storage' as unknown as STORAGE);
    }).toThrow(Error('storage does not exist.'));
  });
});
