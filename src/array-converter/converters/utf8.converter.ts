export const Utf8Converter = {
  toUint8Array(utf8: string) {
    if (utf8 === undefined || utf8 === null) {
      return null;
    }

    if (utf8.length === 0) {
      return new Uint8Array(0);
    }

    return new Uint8Array(new TextEncoder().encode(utf8));
  },

  toUtf8(uint8Array: Uint8Array) {
    if (uint8Array === undefined || uint8Array === null) {
      return uint8Array;
    }

    if (uint8Array.length === 0) {
      return '';
    }

    return new TextDecoder().decode(uint8Array);
  },
};
