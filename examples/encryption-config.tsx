/**
 * Example: Configuring Encryption in rn-alpha-hooks
 * 
 * This file demonstrates all three methods of configuring encryption:
 * 1. Via AlphaProvider (Recommended for app-wide config)
 * 2. Via setEncryptionConfig() (For runtime updates)
 * 3. Per-call custom keys (For specific operations)
 */

import React from 'react';
import { 
  AlphaProvider, 
  setEncryptionConfig, 
  getEncryptionConfig,
  generateEncryptionConfig,
  isValidEncryptionConfig,
  encrypt, 
  decrypt 
} from '@scripturecoder/rn-alpha-hooks';

// ============================================
// Method 1: Via AlphaProvider (Recommended)
// ============================================

/**
 * Set encryption keys globally via AlphaProvider config
 * This is the recommended approach for most applications
 */
export function AppWithEncryption() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        paths: {
          login: 'POST:/auth/login',
          profile: 'GET:/user/profile',
        },
        
        // Set encryption configuration
        encryption: {
          key: process.env.REACT_APP_ENCRYPTION_KEY || 'YourSecretKey123', // 16 chars
          iv: process.env.REACT_APP_ENCRYPTION_IV || 'YourIVValue12345',   // 16 chars
        },
        
        debug: __DEV__,
      }}
    >
      <Navigation />
    </AlphaProvider>
  );
}

// ============================================
// Method 2: Via setEncryptionConfig()
// ============================================

/**
 * Update encryption config at runtime
 * Useful for dynamic key rotation or user-specific keys
 */
export function updateEncryptionKeys() {
  // Update both keys
  setEncryptionConfig({
    key: 'NewSecretKey1234',
    iv: 'NewIVValue123456',
  });
  
  // Or update just one
  setEncryptionConfig({
    key: 'OnlyUpdateKey123',
  });
}

/**
 * Example: Key rotation on user login
 */
export function handleUserLogin(userId: string, sessionKey: string) {
  // Generate user-specific encryption key
  const userKey = `${sessionKey.substring(0, 16)}`;
  const userIv = `${userId}${sessionKey}`.substring(0, 16);
  
  setEncryptionConfig({
    key: userKey,
    iv: userIv,
  });
  
  console.log('Encryption keys updated for user:', userId);
}

/**
 * Example: Get current encryption config
 */
export function displayCurrentKeys() {
  const config = getEncryptionConfig();
  
  // ⚠️ NEVER log keys in production!
  if (__DEV__) {
    console.log('Current encryption config:', config);
  }
}

// ============================================
// Method 3: Per-Call Custom Keys
// ============================================

/**
 * Use custom keys for specific operations
 * Useful when different data needs different encryption
 */
export function encryptWithCustomKeys() {
  const sensitiveData = 'Credit card: 1234-5678-9012-3456';
  
  // Use custom keys just for this operation
  const encrypted = encrypt(
    sensitiveData,
    'CustomKey1234567',  // Custom key (16 chars)
    'CustomIV12345678'   // Custom IV (16 chars)
  );
  
  return encrypted;
}

/**
 * Decrypt with matching custom keys
 */
export function decryptWithCustomKeys(encryptedData: string) {
  // Must use the SAME keys that were used for encryption
  const decrypted = decrypt(
    encryptedData,
    'CustomKey1234567',  // Same custom key
    'CustomIV12345678'   // Same custom IV
  );
  
  return decrypted;
}

/**
 * Example: Encrypt different types of data with different keys
 */
export function multiLevelEncryption() {
  // Use global config for general data
  const generalData = encrypt('User preferences');
  
  // Use custom keys for highly sensitive data
  const financialData = encrypt(
    'Bank account: 123456789',
    'BankDataKey12345',
    'BankDataIV123456'
  );
  
  const healthData = encrypt(
    'Medical record #12345',
    'HealthDataKey123',
    'HealthDataIV1234'
  );
  
  return { generalData, financialData, healthData };
}

// ============================================
// Helper Functions & Validation
// ============================================

/**
 * Generate random encryption config
 * ⚠️ Store these securely - never hardcode in production!
 */
export function setupNewEncryptionKeys() {
  const newConfig = generateEncryptionConfig();
  
  console.log('🔐 Generated new encryption keys:');
  console.log('Key:', newConfig.key);
  console.log('IV:', newConfig.iv);
  console.log('⚠️ Store these in your environment variables!');
  
  return newConfig;
}

/**
 * Validate encryption config before using
 */
export function validateAndSetKeys(key: string, iv: string): boolean {
  const config = { key, iv };
  
  if (isValidEncryptionConfig(config)) {
    setEncryptionConfig(config);
    console.log('✅ Encryption keys validated and set');
    return true;
  } else {
    console.error('❌ Invalid encryption config');
    return false;
  }
}

/**
 * Example: Load keys from secure storage on app start
 */
export async function loadEncryptionKeysFromStorage() {
  try {
    // Load from secure storage (e.g., react-native-keychain)
    const key = await getSecureValue('encryption_key');
    const iv = await getSecureValue('encryption_iv');
    
    if (key && iv && isValidEncryptionConfig({ key, iv })) {
      setEncryptionConfig({ key, iv });
      console.log('✅ Encryption keys loaded from secure storage');
    } else {
      console.warn('⚠️ No valid keys found, using defaults');
    }
  } catch (error) {
    console.error('Error loading encryption keys:', error);
  }
}

// Mock secure storage function
async function getSecureValue(key: string): Promise<string | null> {
  // In real app, use react-native-keychain or similar
  return null;
}

// ============================================
// Component Examples
// ============================================

/**
 * Example: Component that encrypts user input
 */
export function SecureInputForm() {
  const [input, setInput] = React.useState('');
  const [encrypted, setEncrypted] = React.useState('');
  
  const handleEncrypt = () => {
    const result = encrypt(input);
    setEncrypted(result);
  };
  
  const handleDecrypt = () => {
    const result = decrypt(encrypted);
    console.log('Decrypted:', result);
  };
  
  return (
    <div>
      <h2>Secure Input</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter sensitive data"
      />
      <button onClick={handleEncrypt}>Encrypt</button>
      
      {encrypted && (
        <>
          <p>Encrypted: {encrypted}</p>
          <button onClick={handleDecrypt}>Decrypt</button>
        </>
      )}
    </div>
  );
}

/**
 * Example: Key rotation on schedule
 */
export function EncryptionKeyRotationService() {
  React.useEffect(() => {
    // Rotate keys every 24 hours
    const interval = setInterval(() => {
      const newConfig = generateEncryptionConfig();
      setEncryptionConfig(newConfig);
      
      // Store new keys securely
      storeKeysSecurely(newConfig);
      
      console.log('🔄 Encryption keys rotated');
    }, 24 * 60 * 60 * 1000); // 24 hours
    
    return () => clearInterval(interval);
  }, []);
  
  return null;
}

async function storeKeysSecurely(config: { key: string; iv: string }) {
  // In real app, store in secure storage
  console.log('Storing keys securely...');
}

// ============================================
// Best Practices
// ============================================

/**
 * Best Practices for Encryption Configuration:
 * 
 * 1. NEVER hardcode keys in source code
 *    ❌ key: 'hardcoded-key-123'
 *    ✅ key: process.env.ENCRYPTION_KEY
 * 
 * 2. Use environment variables for keys
 *    - Development: .env.development
 *    - Production: Secure environment config
 * 
 * 3. Keys must be exactly 16 characters for AES-128
 *    - Use isValidEncryptionConfig() to validate
 * 
 * 4. Store keys securely
 *    - Use react-native-keychain for mobile
 *    - Use secure backend key management systems
 * 
 * 5. Implement key rotation
 *    - Regularly update encryption keys
 *    - Keep track of old keys for decryption
 * 
 * 6. Never log keys in production
 *    if (__DEV__) { console.log(key); }
 * 
 * 7. Use different keys for different data types
 *    - General data: global config
 *    - Financial data: custom keys
 *    - Health data: custom keys
 * 
 * 8. Decrypt on the backend when possible
 *    - Client-side encryption is for transit security
 *    - Backend should handle sensitive operations
 */

// ============================================
// Environment Variable Setup
// ============================================

/**
 * .env.development
 * ```
 * REACT_APP_ENCRYPTION_KEY=DevKey1234567890
 * REACT_APP_ENCRYPTION_IV=DevIV12345678901
 * ```
 * 
 * .env.production
 * ```
 * REACT_APP_ENCRYPTION_KEY=your-production-key-here
 * REACT_APP_ENCRYPTION_IV=your-production-iv-here
 * ```
 * 
 * Access in code:
 * ```
 * const key = process.env.REACT_APP_ENCRYPTION_KEY;
 * const iv = process.env.REACT_APP_ENCRYPTION_IV;
 * ```
 */

// ============================================
// Testing
// ============================================

/**
 * Test encryption/decryption cycle
 */
export function testEncryptionCycle() {
  const originalData = 'Test data 12345';
  
  // Encrypt
  const encrypted = encrypt(originalData);
  console.log('Encrypted:', encrypted);
  
  // Decrypt
  const decrypted = decrypt(encrypted);
  console.log('Decrypted:', decrypted);
  
  // Verify
  if (originalData === decrypted) {
    console.log('✅ Encryption cycle successful');
    return true;
  } else {
    console.error('❌ Encryption cycle failed');
    return false;
  }
}

/**
 * Test with custom keys
 */
export function testCustomKeyEncryption() {
  const data = 'Custom key test';
  const customKey = 'TestKey123456789';
  const customIv = 'TestIV1234567890';
  
  // Encrypt with custom keys
  const encrypted = encrypt(data, customKey, customIv);
  
  // Decrypt with same custom keys
  const decrypted = decrypt(encrypted, customKey, customIv);
  
  console.log('Custom key test:', data === decrypted ? '✅' : '❌');
  return data === decrypted;
}

