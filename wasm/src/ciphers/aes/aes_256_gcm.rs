use crate::ciphers::cipher::Cipher;
use aes_gcm::{
    aead::{Aead, AeadCore, KeyInit, OsRng},
    Key,
};
use sha2::digest::generic_array::GenericArray;

pub struct Aes256Gcm;

impl Cipher for Aes256Gcm {
    fn encrypt(&self, text: &str, key: &str) -> Result<String, String> {
        let key = match hex::decode(key) {
            Ok(key) => key,
            Err(error) => return Err(error.to_string()),
        };
        let key = Key::<aes_gcm::Aes256Gcm>::from_slice(&key);

        let cipher = aes_gcm::Aes256Gcm::new(&key);
        let nonce = aes_gcm::Aes256Gcm::generate_nonce(&mut OsRng);

        let ciphertext = match cipher.encrypt(&nonce, text.as_bytes()) {
            Ok(encrypted) => encrypted,
            Err(error) => return Err(error.to_string()),
        };

        Ok(format!("{}{}", hex::encode(nonce), hex::encode(ciphertext)).to_string())
    }

    fn decrypt(&self, hex: &str, key: &str) -> Result<String, String> {
        let nonce_str = &hex[0..24];
        let nonce_dec = match hex::decode(nonce_str) {
            Ok(decoded) => decoded,
            Err(error) => return Err(error.to_string()),
        };

        if nonce_dec.len() == 0 {
            return Err("nonce was not created.".to_string());
        }

        let nonce: &[u8] = &nonce_dec;

        let text_str = &hex[24..hex.len()];
        let text_dec = match hex::decode(text_str) {
            Ok(decoded) => decoded,
            Err(error) => return Err(error.to_string()),
        };

        if text_dec.len() == 0 {
            return Err("there is no text to decrypt.".to_string());
        }

        let text: &[u8] = &text_dec;

        let key = match hex::decode(key) {
            Ok(key) => key,
            Err(error) => return Err(error.to_string()),
        };
        let key = Key::<aes_gcm::Aes256Gcm>::from_slice(&key);

        let cipher = aes_gcm::Aes256Gcm::new(&key);

        let plaintext = match cipher.decrypt(&GenericArray::from_slice(nonce), text) {
            Ok(decrypted) => decrypted,
            Err(error) => return Err(error.to_string()),
        };

        Ok(format!(
            "{}",
            String::from_utf8(plaintext).unwrap().to_string()
        ))
    }
}
