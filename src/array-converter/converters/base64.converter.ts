export const Base64Converter = {
  toUint8Array(base64: string) {
    if (base64 === undefined || base64 === null) {
      return null;
    }

    if (base64.length === 0) {
      return new Uint8Array(0);
    }

    const binary = atob(base64);
    const uint8Array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      uint8Array[i] = binary.charCodeAt(i);
    }

    return uint8Array;
  },

  toBase64(uint8Array: Uint8Array) {
    if (uint8Array === undefined || uint8Array === null) {
      return uint8Array;
    }

    if (uint8Array.length === 0) {
      return '';
    }

    const base64 = Array.from(uint8Array, (x) => String.fromCodePoint(x)).join(
      ''
    );

    return btoa(base64);
  },
};
