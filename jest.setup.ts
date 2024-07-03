import { TextEncoder, TextDecoder } from 'util';
import { webcrypto } from 'crypto';

Object.assign(global, { TextDecoder, TextEncoder });
Object.defineProperty(globalThis, 'crypto', {
  value: webcrypto,
});
