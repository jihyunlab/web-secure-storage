# @jihyunlab/web-secure-storage

[![Version](https://img.shields.io/npm/v/@jihyunlab/web-secure-storage.svg?style=flat-square)](https://www.npmjs.com/package/@jihyunlab/web-secure-storage?activeTab=versions) [![Downloads](https://img.shields.io/npm/dt/@jihyunlab/web-secure-storage.svg?style=flat-square)](https://www.npmjs.com/package/@jihyunlab/web-secure-storage) [![Last commit](https://img.shields.io/github/last-commit/jihyunlab/web-secure-storage.svg?style=flat-square)](https://github.com/jihyunlab/web-secure-storage/graphs/commit-activity) [![License](https://img.shields.io/github/license/jihyunlab/web-secure-storage.svg?style=flat-square)](https://github.com/jihyunlab/web-secure-storage/blob/master/LICENSE) [![Linter](https://img.shields.io/badge/linter-eslint-blue?style=flat-square)](https://eslint.org) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)\
[![Build](https://github.com/jihyunlab/web-secure-storage/actions/workflows/build.yml/badge.svg)](https://github.com/jihyunlab/web-secure-storage/actions/workflows/build.yml) [![Lint](https://github.com/jihyunlab/web-secure-storage/actions/workflows/lint.yml/badge.svg)](https://github.com/jihyunlab/web-secure-storage/actions/workflows/lint.yml) [![Prettier](https://github.com/jihyunlab/web-secure-storage/actions/workflows/prettier.yml/badge.svg)](https://github.com/jihyunlab/web-secure-storage/actions/workflows/prettier.yml) [![codecov](https://codecov.io/gh/jihyunlab/web-secure-storage/graph/badge.svg?token=QJX5G75FXA)](https://codecov.io/gh/jihyunlab/web-secure-storage)

@jihyunlab/web-secure-storage can be used by web applications such as React.

@jihyunlab/web-secure-storage encrypts values ​​and stores them in local or session storage. When getting stored values, they are decrypts back to their original values.

The encryption function is implemented with [Web Crypto API](https://nodejs.org/api/webcrypto.html) in Node.js and provides encryption for AES 256 CBC and AES 256 GCM.

## Installation

```bash
npm i @jihyunlab/web-secure-storage
```

## Usage

```
import {
  WebSecureStorage,
  CIPHER,
  STORAGE,
} from '@jihyunlab/web-secure-storage';

const storage = await WebSecureStorage.create(
  STORAGE.LOCAL,
  CIPHER.AES_256_GCM,
  'your secret key'
);

storage.clear();

await storage.setItem('item', 'value');

const value = await storage.getItem('item');
console.log(value);

storage.removeItem('item');
```

## Credits

Authored and maintained by JihyunLab <<info@jihyunlab.com>>

## License

Open source [licensed as MIT](https://github.com/jihyunlab/web-secure-storage/blob/master/LICENSE).
