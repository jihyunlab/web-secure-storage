export const Buffer = {
  toUint8Array(hex: string) {
    let input = hex;

    if (input === undefined || input === null) {
      return null;
    }

    if (input.length === 0) {
      return new ArrayBuffer(0);
    }

    if (input.length % 2 !== 0) {
      input = '0' + input;
    }

    const bytes = input.length / 2;
    const uint8Array = new Uint8Array(bytes);

    let index: number;

    for (let i = 0; i < bytes; i++) {
      index = i * 2;
      uint8Array[i] = parseInt(input.substring(index, index + 2), 16);
    }

    return uint8Array;
  },

  toHex(buffer: ArrayBuffer) {
    if (!buffer) {
      return buffer;
    }

    if (buffer.byteLength === 0) {
      return '';
    }

    const uint8Array = new Uint8Array(buffer);

    let hex = '';
    let code: string;

    for (let i = 0; i < uint8Array.length; i++) {
      code = uint8Array[i].toString(16);

      if (code.length === 1) {
        code = '0' + code;
      }

      hex = hex + code;
    }

    return hex;
  },
};
