import CryptoJS from "react-native-crypto-js";

/**
 * Encryption configuration interface
 */
export interface EncryptionConfig {
  key: string;
  iv: string;
}

/**
 * Default encryption config (for development only)
 * ⚠️ NEVER use these keys in production!
 */
const DEFAULT_CONFIG: EncryptionConfig = {
  key: "2vn!H3KXgX-TxvkD", // Default for development
  iv: "%x%97Uw@*A2xWaUJ"   // Default for development
};

/**
 * Current encryption configuration
 */
let currentConfig: EncryptionConfig = { ...DEFAULT_CONFIG };

/**
 * Flag to track if default keys warning has been shown
 */
let hasWarnedAboutDefaultKeys = false;

/**
 * Set encryption configuration globally
 * 
 * @param config - Partial encryption config to merge with current config
 * 
 * @example
 * ```typescript
 * import { setEncryptionConfig } from '@scripturecoder/rn-alpha-hooks';
 * 
 * setEncryptionConfig({
 *   key: process.env.ENCRYPTION_KEY,
 *   iv: process.env.ENCRYPTION_IV
 * });
 * ```
 */
export function setEncryptionConfig(config: Partial<EncryptionConfig>): void {
  if (config.key !== undefined || config.iv !== undefined) {
    currentConfig = { ...currentConfig, ...config };
    hasWarnedAboutDefaultKeys = false; // Reset warning flag when keys are updated
  }
}

/**
 * Get current encryption configuration
 * 
 * @returns Current encryption config
 */
export function getEncryptionConfig(): EncryptionConfig {
  return { ...currentConfig };
}

/**
 * Validate encryption config
 * 
 * @param config - Encryption config to validate
 * @returns True if valid, false otherwise
 */
export function isValidEncryptionConfig(config: Partial<EncryptionConfig>): boolean {
  if (!config.key || !config.iv) {
    console.error('[rn-alpha-hooks] Encryption config must have both key and iv');
    return false;
  }
  
  if (config.key.length !== 16) {
    console.error('[rn-alpha-hooks] Encryption key must be exactly 16 characters for AES-128');
    return false;
  }
  
  if (config.iv.length !== 16) {
    console.error('[rn-alpha-hooks] IV (Initialization Vector) must be exactly 16 characters');
    return false;
  }
  
  return true;
}

/**
 * Generate random encryption config (for development/testing)
 * ⚠️ Store these securely - do not hardcode in your app!
 * 
 * @returns New random encryption config
 * 
 * @example
 * ```typescript
 * const config = generateEncryptionConfig();
 * console.log('Store these securely:');
 * console.log('Key:', config.key);
 * console.log('IV:', config.iv);
 * ```
 */
export function generateEncryptionConfig(): EncryptionConfig {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  
  const generateRandomString = (length: number): string => {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  return {
    key: generateRandomString(16),
    iv: generateRandomString(16),
  };
}

/**
 * Encrypt a string using AES encryption
 * 
 * @param payload - String to encrypt
 * @param customKey - Optional custom encryption key (overrides global config)
 * @param customIv - Optional custom IV (overrides global config)
 * @returns Encrypted string
 * 
 * @example
 * ```typescript
 * // Using global config
 * const encrypted = encrypt('sensitive data');
 * 
 * // Using custom keys for this operation
 * const encrypted = encrypt('data', 'my-custom-key123', 'my-custom-iv-123');
 * ```
 */
export function encrypt(
  payload: string,
  customKey?: string,
  customIv?: string
): string {
  const keyStr = customKey || currentConfig.key;
  const ivStr = customIv || currentConfig.iv;
  
  // Warn in development if using default keys
  if (
    typeof __DEV__ !== 'undefined' && 
    __DEV__ && 
    keyStr === DEFAULT_CONFIG.key && 
    !hasWarnedAboutDefaultKeys
  ) {
    console.warn(
      '[rn-alpha-hooks] ⚠️ Using default encryption keys! ' +
      'Set custom keys via AlphaProvider config.encryption or setEncryptionConfig() for production.'
    );
    hasWarnedAboutDefaultKeys = true;
  }
  
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  
  return CryptoJS.AES.encrypt(payload, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
}

/**
 * Decrypt an encrypted string using AES decryption
 * 
 * @param response - Encrypted string to decrypt
 * @param customKey - Optional custom encryption key (must match encryption key)
 * @param customIv - Optional custom IV (must match encryption IV)
 * @returns Decrypted string
 * 
 * @example
 * ```typescript
 * // Using global config
 * const decrypted = decrypt(encryptedData);
 * 
 * // Using custom keys (must match encryption keys)
 * const decrypted = decrypt(encryptedData, 'my-custom-key123', 'my-custom-iv-123');
 * ```
 */
export function decrypt(
  response: string,
  customKey?: string,
  customIv?: string
): string {
  const keyStr = customKey || currentConfig.key;
  const ivStr = customIv || currentConfig.iv;
  
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  
  const decrypted_response = CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(response) },
    key,
    { iv: iv }
  );
  
  return decrypted_response.toString(CryptoJS.enc.Utf8);
}
