# web-secure-storage

[![Version](https://img.shields.io/npm/v/@jihyunlab/web-secure-storage.svg?style=flat-square)](https://www.npmjs.com/package/@jihyunlab/web-secure-storage?activeTab=versions) [![Downloads](https://img.shields.io/npm/dt/@jihyunlab/web-secure-storage.svg?style=flat-square)](https://www.npmjs.com/package/@jihyunlab/web-secure-storage) [![Last commit](https://img.shields.io/github/last-commit/jihyunlab/web-secure-storage.svg?style=flat-square)](https://github.com/jihyunlab/web-secure-storage/graphs/commit-activity) [![License](https://img.shields.io/github/license/jihyunlab/web-secure-storage.svg?style=flat-square)](https://github.com/jihyunlab/web-secure-storage/blob/master/LICENSE)

JihyunLab Web secure storage.

Web secure storage can be used by web applications such as React.

Web secure storage encrypts values ​​and stores them in local or session storage. When getting stored values, they are decrypts back to their original values.

Web secure storage provides encryption and decryption with AES(Advanced Encryption Standard) and PBKDF2(Password-Based Key Derivation Function 2). Also, because a random iv(Initialization Vector) value is used for encryption, the value cannot be easily guessed.

## Requirements

Node.js

## Setup

### 1) Setup regular JihyunLab Web secure storage

```bash
npm install @jihyunlab/web-secure-storage
```

or

```bash
yarn add @jihyunlab/web-secure-storage
```

## Usage

```react
import { SecureStorage, STORAGE, CRYPTO } from '@jihyunlab/web-secure-storage'

const storage = SecureStorage(STORAGE.LOCAL, CRYPTO.AES, 'your secret key', 100 /* The number of iterations for PBKDF2 */);

storage.clear();
storage.setItem('item', 'value');
storage.getItem('item');
storage.removeItem('item');
```
