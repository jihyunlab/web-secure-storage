mod ciphers;
mod helpers;

pub mod wasm_cipher {
    use crate::ciphers::cipher;
    use wasm_bindgen::prelude::*;

    #[wasm_bindgen]
    pub fn encrypt(cipher: &str, text: &str, key: &str) -> JsValue {
        if text.len() == 0 {
            return JsValue::null();
        }

        if key.len() == 0 {
            return JsValue::null();
        }

        let ciphertext = match cipher::encrypt(cipher, text, key) {
            Ok(ciphertext) => ciphertext,
            _ => return JsValue::null(),
        };

        if ciphertext.len() == 0 {
            return JsValue::null();
        }

        JsValue::from_str(ciphertext.as_str())
    }

    #[wasm_bindgen]
    pub fn decrypt(cipher: &str, hex: &str, key: &str) -> JsValue {
        if hex.len() <= 24 {
            return JsValue::null();
        }

        if key.len() == 0 {
            return JsValue::null();
        }

        let plaintext = match cipher::decrypt(cipher, hex, key) {
            Ok(plaintext) => plaintext,
            _ => return JsValue::null(),
        };

        JsValue::from_str(plaintext.as_str())
    }
}

pub mod wasm_key {
    use crate::helpers::key;
    use wasm_bindgen::prelude::*;

    #[wasm_bindgen]
    pub fn pbkdf2(password: &str, length: u32, salt: &str, iterations: u32) -> JsValue {
        if password.len() == 0 {
            return JsValue::null();
        }

        if length != 256 {
            return JsValue::null();
        }

        let key = match key::pbkdf2(password, salt, iterations) {
            Ok(key) => key,
            _ => return JsValue::null(),
        };

        if key.len() == 0 {
            return JsValue::null();
        }

        JsValue::from_str(key.as_str())
    }
}
