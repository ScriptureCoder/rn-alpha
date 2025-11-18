import { encrypt, decrypt, isValidEncryptionConfig, getEncryptionConfig } from "../../utils/crypto";

/**
 * Encryption options for requests and responses
 */
export interface EncryptionOptions {
  enabled?: boolean;
  request?: 'full' | string[]; // Encrypt entire body or specific keys
  response?: 'full' | string[]; // Decrypt entire response or specific keys
}

/**
 * Resolves encryption options from hook option and global config
 * @param hookOption - Encryption option passed to the hook
 * @param globalDefault - Global default from AlphaConfig
 * @returns Resolved EncryptionOptions or null if disabled
 */
export function resolveEncryptionOptions(
  hookOption?: boolean | EncryptionOptions,
  globalDefault?: boolean | EncryptionOptions
): EncryptionOptions | null {
  // Hook option takes precedence
  if (hookOption !== undefined) {
    if (hookOption === false) return null;
    if (hookOption === true) return { enabled: true, request: 'full', response: 'full' };
    return { enabled: true, ...hookOption };
  }

  // Fall back to global default
  if (globalDefault !== undefined) {
    if (globalDefault === false) return null;
    if (globalDefault === true) return { enabled: true, request: 'full', response: 'full' };
    return { enabled: true, ...globalDefault };
  }

  // Default: no encryption
  return null;
}

/**
 * Applies encryption to request data based on options
 * @param data - Request data object
 * @param options - Encryption options
 * @returns Encrypted data object
 */
export function applyRequestEncryption(
  data: Record<string, any>,
  options: EncryptionOptions
): Record<string, any> | string {
  if (!options.enabled || !options.request) {
    return data;
  }

  // Validate encryption config
  const config = getEncryptionConfig();
  if (!isValidEncryptionConfig(config)) {
    throw new Error(
      "Encryption is enabled but encryption keys are not configured. " +
      "Please set encryption keys via AlphaConfig or setEncryptionConfig()."
    );
  }

  try {
    // Full body encryption
    if (options.request === 'full') {
      const jsonString = JSON.stringify(data);
      return encrypt(jsonString, config.key, config.iv);
    }

    // Partial encryption - specific keys
    if (Array.isArray(options.request)) {
      const result = { ...data };
      for (const key of options.request) {
        if (key in data) {
          const value = data[key];
          const valueString = typeof value === 'string' ? value : JSON.stringify(value);
          result[key] = encrypt(valueString, config.key, config.iv);
        }
      }
      return result;
    }

    return data;
  } catch (error: any) {
    throw new Error(`Request encryption failed: ${error.message}`);
  }
}

/**
 * Applies decryption to response data based on options
 * @param data - Response data
 * @param options - Encryption options
 * @returns Decrypted data
 */
export function applyResponseDecryption(
  data: any,
  options: EncryptionOptions
): any {
  if (!options.enabled || !options.response) {
    return data;
  }

  // Validate encryption config
  const config = getEncryptionConfig();
  if (!isValidEncryptionConfig(config)) {
    throw new Error(
      "Decryption is enabled but encryption keys are not configured. " +
      "Please set encryption keys via AlphaConfig or setEncryptionConfig()."
    );
  }

  try {
    // Full response decryption
    if (options.response === 'full') {
      if (typeof data === 'string') {
        const decrypted = decrypt(data, config.key, config.iv);
        try {
          return JSON.parse(decrypted);
        } catch {
          return decrypted;
        }
      }
      // If data has an 'encrypted' field, decrypt that
      if (data && typeof data === 'object' && 'encrypted' in data) {
        const decrypted = decrypt(data.encrypted, config.key, config.iv);
        try {
          return JSON.parse(decrypted);
        } catch {
          return decrypted;
        }
      }
      return data;
    }

    // Partial decryption - specific keys
    if (Array.isArray(options.response) && data && typeof data === 'object') {
      const result = { ...data };
      for (const key of options.response) {
        if (key in data && typeof data[key] === 'string') {
          try {
            const decrypted = decrypt(data[key], config.key, config.iv);
            try {
              result[key] = JSON.parse(decrypted);
            } catch {
              result[key] = decrypted;
            }
          } catch (error: any) {
            // If decryption fails for a specific key, log warning but continue
            console.warn(`Failed to decrypt key '${key}':`, error.message);
          }
        }
      }
      return result;
    }

    return data;
  } catch (error: any) {
    throw new Error(`Response decryption failed: ${error.message}`);
  }
}

