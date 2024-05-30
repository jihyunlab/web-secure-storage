use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Aes256Gcm, Key,
};
use pbkdf2::pbkdf2_hmac_array;
use sha2::Sha256;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn encrypt(text: &str, password: &str, salt: &str, iterations: u32) -> String {
    let key = pbkdf2_hmac_array::<Sha256, 32>(password.as_bytes(), salt.as_bytes(), iterations);
    let key = Key::<Aes256Gcm>::from_slice(&key);

    let cipher = Aes256Gcm::new(&key);
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
    let ciphertext = cipher.encrypt(&nonce, text.as_bytes()).unwrap();

    let string = String::from_utf8(ciphertext).unwrap();
    string
}

#[wasm_bindgen]
pub fn decrypt(text: &str, password: &str, salt: &str, iterations: u32) -> String {
    let key = pbkdf2_hmac_array::<Sha256, 32>(password.as_bytes(), salt.as_bytes(), iterations);
    let key = Key::<Aes256Gcm>::from_slice(&key);

    let cipher = Aes256Gcm::new(&key);
    let nonce = Aes256Gcm::generate_nonce(&mut OsRng);
    let plaintext = cipher.decrypt(&nonce, text.as_bytes()).unwrap();

    let string = String::from_utf8(plaintext).unwrap();
    string
}
