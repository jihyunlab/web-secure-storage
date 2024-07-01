use pbkdf2::pbkdf2_hmac_array;
use sha2::Sha256;

pub fn pbkdf2(password: &str, salt: &str, iterations: u32) -> Result<String, String> {
    let key = pbkdf2_hmac_array::<Sha256, 32>(password.as_bytes(), salt.as_bytes(), iterations);
    Ok(format!("{}", hex::encode(key).to_string()))
}
