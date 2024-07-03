export const Key = {
  async pbkdf2(
    cipher: string,
    length: number,
    password: string,
    salt: string,
    iterations: number
  ) {
    const textEncoder = new TextEncoder();

    const baseKey = await crypto.subtle.importKey(
      'raw',
      textEncoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        hash: 'SHA-512',
        salt: textEncoder.encode(salt),
        iterations,
      },
      baseKey,
      {
        name: cipher,
        length,
      },
      true,
      ['encrypt', 'decrypt']
    );

    return key;
  },
};
