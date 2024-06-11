use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Key,
};
use pbkdf2::pbkdf2_hmac_array;
use sha2::{digest::generic_array::GenericArray, Sha256};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt(text: &str, password: &str, salt: &str, iterations: u32) -> JsValue {
    let len = text.len();

    if len == 0 {
        return JsValue::null();
    }

    let len = password.len();

    if len == 0 {
        return JsValue::null();
    }

    let key = pbkdf2_hmac_array::<Sha256, 32>(password.as_bytes(), salt.as_bytes(), iterations);
    let key = Key::<Aes256Gcm>::from_slice(&key);

    let cipher = Aes256Gcm::new(&key);
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);

    let ciphertext = match cipher.encrypt(&nonce, text.as_bytes()) {
        Ok(encrypted) => encrypted,
        _ => Vec::new(),
    };

    if ciphertext.len() == 0 {
        return JsValue::null();
    }

    JsValue::from_str(&format!(
        "{}{}",
        hex::encode(nonce),
        hex::encode(ciphertext)
    ))
}

#[wasm_bindgen]
pub fn decrypt(hex: &str, password: &str, salt: &str, iterations: u32) -> JsValue {
    let len = hex.len();

    if len <= 24 {
        return JsValue::null();
    }

    let nonce_str = &hex[0..24];
    let nonce_dec = match hex::decode(nonce_str) {
        Ok(decoded) => decoded,
        _ => Vec::new(),
    };

    if nonce_dec.len() == 0 {
        return JsValue::null();
    }

    let nonce: &[u8] = &nonce_dec;

    let text_str = &hex[24..len];
    let text_dec = match hex::decode(text_str) {
        Ok(decoded) => decoded,
        _ => Vec::new(),
    };

    if text_dec.len() == 0 {
        return JsValue::null();
    }

    let text: &[u8] = &text_dec;

    let key = pbkdf2_hmac_array::<Sha256, 32>(password.as_bytes(), salt.as_bytes(), iterations);
    let key = Key::<Aes256Gcm>::from_slice(&key);

    let cipher = Aes256Gcm::new(&key);

    let plaintext = match cipher.decrypt(&GenericArray::from_slice(nonce), text) {
        Ok(decrypted) => decrypted,
        _ => Vec::new(),
    };

    if plaintext.len() == 0 {
        return JsValue::null();
    }

    JsValue::from_str(&format!(
        "{}",
        String::from_utf8(plaintext).unwrap().to_string()
    ))
}
