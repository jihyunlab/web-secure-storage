export const Base64UrlConverter = {
  toUint8Array(base64Url: string) {
    if (base64Url === undefined || base64Url === null) {
      return null;
    }

    if (base64Url.length === 0) {
      return new Uint8Array(0);
    }

    const binary = atob(base64Url.replace(/-/g, '+').replace(/_/g, '/'));
    const uint8Array = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      uint8Array[i] = binary.charCodeAt(i);
    }

    return uint8Array;
  },

  toBase64Url(uint8Array: Uint8Array) {
    if (uint8Array === undefined || uint8Array === null) {
      return uint8Array;
    }

    if (uint8Array.length === 0) {
      return '';
    }

    const base64Url = Array.from(uint8Array, (x) => String.fromCodePoint(x))
      .join('')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');

    return btoa(base64Url);
  },
};
