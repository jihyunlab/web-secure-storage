import { Buffer } from '../../src/helpers/buffer.helper';

describe('Buffer helper', () => {
  test(`Negative: toUint8Array() - null`, async () => {
    expect(Buffer.toUint8Array(null as unknown as string)).toBeNull();
  });

  test(`Negative: toUint8Array() - empty hex`, async () => {
    expect(Buffer.toUint8Array('')).toStrictEqual(new ArrayBuffer(0));
  });

  test(`Negative: toUint8Array() - not enough hex string`, async () => {
    expect(Buffer.toUint8Array('1')).toStrictEqual(new Uint8Array([1]));
  });

  test(`Negative: toHex() - null`, async () => {
    expect(Buffer.toHex(null as unknown as ArrayBuffer)).toBeNull();
  });

  test(`Negative: toHex() - empty buffer`, async () => {
    expect(Buffer.toHex(new ArrayBuffer(0))).toStrictEqual('');
  });
});
