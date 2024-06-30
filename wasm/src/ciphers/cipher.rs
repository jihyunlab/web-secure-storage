use crate::ciphers::aes::aes_256_gcm::Aes256Gcm;

pub trait Cipher {
    fn encrypt(
        &self,
        text: &str,
        password: &str,
        salt: &str,
        iterations: u32,
    ) -> Result<String, String>;

    fn decrypt(
        &self,
        hex: &str,
        password: &str,
        salt: &str,
        iterations: u32,
    ) -> Result<String, String>;
}

pub fn encrypt(
    cipher: &str,
    text: &str,
    password: &str,
    salt: &str,
    iterations: u32,
) -> Result<String, String> {
    match cipher.trim().to_uppercase().as_str() {
        "AES-256-GCM" => Aes256Gcm.encrypt(text, password, salt, iterations),
        _ => Err(String::from(format!("{} cipher not found.", cipher))),
    }
}

pub fn decrypt(
    cipher: &str,
    hex: &str,
    password: &str,
    salt: &str,
    iterations: u32,
) -> Result<String, String> {
    match cipher.trim().to_uppercase().as_str() {
        "AES-256-GCM" => Aes256Gcm.decrypt(hex, password, salt, iterations),
        _ => Err(String::from(format!("{} cipher not found.", cipher))),
    }
}
