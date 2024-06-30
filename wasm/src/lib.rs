mod ciphers;

use ciphers::cipher;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt(text: &str, password: &str, salt: &str, iterations: u32) -> JsValue {
    if text.len() == 0 {
        return JsValue::null();
    }

    if password.len() == 0 {
        return JsValue::null();
    }

    let ciphertext = match cipher::encrypt("AES-256-GCM", text, password, salt, iterations) {
        Ok(encrypted) => encrypted,
        _ => return JsValue::null(),
    };

    if ciphertext.len() == 0 {
        return JsValue::null();
    }

    JsValue::from_str(ciphertext.as_str())
}

#[wasm_bindgen]
pub fn decrypt(hex: &str, password: &str, salt: &str, iterations: u32) -> JsValue {
    if hex.len() <= 24 {
        return JsValue::null();
    }

    if password.len() == 0 {
        return JsValue::null();
    }

    let plaintext = match cipher::decrypt("AES-256-GCM", hex, password, salt, iterations) {
        Ok(decrypted) => decrypted,
        _ => return JsValue::null(),
    };

    JsValue::from_str(plaintext.as_str())
}
