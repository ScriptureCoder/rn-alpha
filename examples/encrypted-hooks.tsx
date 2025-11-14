/**
 * Example: Encrypted Hooks Wrapper
 * 
 * This file demonstrates how to wrap rn-alpha hooks with encryption/decryption layers.
 * Use this pattern in your app to add custom business logic like encryption, logging, analytics, etc.
 * 
 * @example
 * // In your app, create hooks/useEncryptedQuery.ts with this pattern
 * // Then use it instead of the base useQuery
 */

import { useQuery, useMutation, QueryOptions, MutationResult } from '@scripturecoder/rn-alpha';
import { Route } from '@scripturecoder/rn-alpha';
import { encrypt, decrypt } from '@scripturecoder/rn-alpha'; // Using the built-in crypto utilities
import { useMemo } from 'react';

// ============================================
// Example 1: Encrypted Query Hook
// ============================================

interface EncryptedQueryOptions extends Omit<QueryOptions, 'variables'> {
  variables?: Record<string, any>;
  encryptVariables?: boolean; // Option to disable encryption per query
  decryptResponse?: boolean; // Option to disable decryption per query
  encryptionKey?: string; // Custom encryption key per query
}

/**
 * Encrypted wrapper around useQuery
 * Automatically encrypts request variables and decrypts response data
 * 
 * @example
 * const { data, loading, error } = useEncryptedQuery('users', {
 *   variables: { email: 'user@example.com' }, // Will be encrypted
 *   encryptionKey: 'your-secret-key',
 * });
 * // data is automatically decrypted
 */
export function useEncryptedQuery<T = any>(
  route: Route,
  options?: EncryptedQueryOptions
) {
  const {
    variables,
    encryptVariables = true,
    decryptResponse = true,
    encryptionKey = process.env.ENCRYPTION_KEY || 'default-key',
    ...restOptions
  } = options || {};

  // Encrypt variables before passing to base hook
  const encryptedVariables = useMemo(() => {
    if (!encryptVariables || !variables) return variables;

    try {
      const encrypted: Record<string, any> = {};
      
      Object.keys(variables).forEach((key) => {
        const value = variables[key];
        // Only encrypt strings and objects, leave primitives as-is
        if (typeof value === 'string' || typeof value === 'object') {
          encrypted[key] = encrypt(JSON.stringify(value), encryptionKey);
        } else {
          encrypted[key] = value;
        }
      });

      return encrypted;
    } catch (error) {
      console.error('[useEncryptedQuery] Encryption failed:', error);
      return variables; // Fallback to unencrypted
    }
  }, [variables, encryptVariables, encryptionKey]);

  // Use base hook with encrypted variables
  const queryResult = useQuery<T>(route, {
    ...restOptions,
    variables: encryptedVariables,
  });

  // Decrypt response data
  const decryptedData = useMemo(() => {
    if (!decryptResponse || !queryResult.data) return queryResult.data;

    try {
      // If data is a string, decrypt it
      if (typeof queryResult.data === 'string') {
        const decrypted = decrypt(queryResult.data, encryptionKey);
        return JSON.parse(decrypted);
      }

      // If data is an object with encrypted fields, decrypt them
      if (typeof queryResult.data === 'object') {
        const decrypted = { ...queryResult.data };
        
        // Decrypt specific fields (customize based on your API response structure)
        const fieldsToDecrypt = ['data', 'user', 'profile', 'details'];
        
        fieldsToDecrypt.forEach((field) => {
          if (decrypted[field] && typeof decrypted[field] === 'string') {
            try {
              decrypted[field] = JSON.parse(decrypt(decrypted[field], encryptionKey));
            } catch (e) {
              // Field might not be encrypted, keep as-is
            }
          }
        });

        return decrypted;
      }

      return queryResult.data;
    } catch (error) {
      console.error('[useEncryptedQuery] Decryption failed:', error);
      return queryResult.data; // Fallback to encrypted data
    }
  }, [queryResult.data, decryptResponse, encryptionKey]);

  return {
    ...queryResult,
    data: decryptedData,
  };
}

// ============================================
// Example 2: Encrypted Mutation Hook
// ============================================

interface EncryptedMutationOptions {
  encryptVariables?: boolean;
  decryptResponse?: boolean;
  encryptionKey?: string;
  keyboard?: boolean;
  text?: boolean;
}

/**
 * Encrypted wrapper around useMutation
 * Encrypts mutation variables and decrypts response
 * 
 * @example
 * const [createUser, { loading, error, data }] = useEncryptedMutation('createUser', {
 *   encryptionKey: 'your-secret-key',
 * });
 * 
 * await createUser({
 *   email: 'user@example.com', // Will be encrypted
 *   password: 'secret123',     // Will be encrypted
 * });
 */
export function useEncryptedMutation<T = any>(
  route: Route,
  options?: EncryptedMutationOptions
): MutationResult<T> {
  const {
    encryptVariables = true,
    decryptResponse = true,
    encryptionKey = process.env.ENCRYPTION_KEY || 'default-key',
    ...restOptions
  } = options || {};

  const [baseMutate, mutationState] = useMutation<T>(route, restOptions);

  // Wrapped mutate function with encryption/decryption
  const encryptedMutate = async (variables: Record<string, any>) => {
    let processedVariables = variables;

    // Encrypt variables
    if (encryptVariables) {
      try {
        processedVariables = {};
        
        Object.keys(variables).forEach((key) => {
          const value = variables[key];
          // Encrypt sensitive fields
          if (typeof value === 'string' || typeof value === 'object') {
            processedVariables[key] = encrypt(JSON.stringify(value), encryptionKey);
          } else {
            processedVariables[key] = value;
          }
        });
      } catch (error) {
        console.error('[useEncryptedMutation] Encryption failed:', error);
        processedVariables = variables;
      }
    }

    // Call base mutation
    const response = await baseMutate(processedVariables);

    // Decrypt response
    if (decryptResponse && response.data) {
      try {
        if (typeof response.data === 'string') {
          response.data = JSON.parse(decrypt(response.data, encryptionKey));
        } else if (typeof response.data === 'object') {
          const decrypted = { ...response.data };
          
          // Decrypt specific fields
          const fieldsToDecrypt = ['data', 'user', 'result'];
          
          fieldsToDecrypt.forEach((field) => {
            if (decrypted[field] && typeof decrypted[field] === 'string') {
              try {
                decrypted[field] = JSON.parse(decrypt(decrypted[field], encryptionKey));
              } catch (e) {
                // Keep as-is if not encrypted
              }
            }
          });

          response.data = decrypted as T;
        }
      } catch (error) {
        console.error('[useEncryptedMutation] Decryption failed:', error);
      }
    }

    return response;
  };

  return [encryptedMutate, mutationState];
}

// ============================================
// Example 3: Selective Field Encryption
// ============================================

interface SelectiveEncryptionOptions extends QueryOptions {
  fieldsToEncrypt?: string[]; // Only encrypt specific fields
  fieldsToDecrypt?: string[]; // Only decrypt specific fields
  encryptionKey?: string;
}

/**
 * More granular control - only encrypt/decrypt specific fields
 * 
 * @example
 * const { data } = useSelectiveEncryptedQuery('users', {
 *   variables: {
 *     email: 'user@example.com',
 *     publicId: '123',
 *   },
 *   fieldsToEncrypt: ['email'], // Only encrypt email field
 *   fieldsToDecrypt: ['ssn', 'cardNumber'], // Only decrypt sensitive response fields
 * });
 */
export function useSelectiveEncryptedQuery<T = any>(
  route: Route,
  options?: SelectiveEncryptionOptions
) {
  const {
    variables,
    fieldsToEncrypt = [],
    fieldsToDecrypt = [],
    encryptionKey = process.env.ENCRYPTION_KEY || 'default-key',
    ...restOptions
  } = options || {};

  // Selectively encrypt fields
  const processedVariables = useMemo(() => {
    if (!variables || fieldsToEncrypt.length === 0) return variables;

    const processed = { ...variables };
    
    fieldsToEncrypt.forEach((field) => {
      if (processed[field]) {
        try {
          const value = typeof processed[field] === 'string' 
            ? processed[field] 
            : JSON.stringify(processed[field]);
          processed[field] = encrypt(value, encryptionKey);
        } catch (error) {
          console.error(`[useSelectiveEncryptedQuery] Failed to encrypt field ${field}:`, error);
        }
      }
    });

    return processed;
  }, [variables, fieldsToEncrypt, encryptionKey]);

  const queryResult = useQuery<T>(route, {
    ...restOptions,
    variables: processedVariables,
  });

  // Selectively decrypt fields
  const processedData = useMemo(() => {
    if (!queryResult.data || fieldsToDecrypt.length === 0) return queryResult.data;

    if (typeof queryResult.data !== 'object') return queryResult.data;

    const processed = { ...queryResult.data };
    
    fieldsToDecrypt.forEach((field) => {
      if (processed[field] && typeof processed[field] === 'string') {
        try {
          const decrypted = decrypt(processed[field], encryptionKey);
          processed[field] = JSON.parse(decrypted);
        } catch (error) {
          console.error(`[useSelectiveEncryptedQuery] Failed to decrypt field ${field}:`, error);
        }
      }
    });

    return processed;
  }, [queryResult.data, fieldsToDecrypt, encryptionKey]);

  return {
    ...queryResult,
    data: processedData,
  };
}

// ============================================
// Example 4: With Logging & Analytics
// ============================================

/**
 * Advanced wrapper that combines encryption with logging/analytics
 * Great for debugging and monitoring
 */
export function useMonitoredEncryptedQuery<T = any>(
  route: Route,
  options?: EncryptedQueryOptions & {
    onEncrypt?: (variables: any) => void;
    onDecrypt?: (data: any) => void;
    onError?: (error: Error, phase: 'encrypt' | 'decrypt') => void;
  }
) {
  const {
    onEncrypt,
    onDecrypt,
    onError,
    ...encryptedOptions
  } = options || {};

  // Use the encrypted query
  const queryResult = useEncryptedQuery<T>(route, encryptedOptions);

  // Add monitoring
  useMemo(() => {
    if (queryResult.data && onDecrypt) {
      onDecrypt(queryResult.data);
    }
  }, [queryResult.data, onDecrypt]);

  return queryResult;
}

// ============================================
// Usage Examples in Your App
// ============================================

/*

// 1. Basic encrypted query
function UserProfile() {
  const { data, loading } = useEncryptedQuery('getProfile', {
    variables: { userId: '123' },
    encryptionKey: 'my-secret-key',
  });

  return <Profile data={data} loading={loading} />;
}

// 2. Encrypted mutation
function CreateUser() {
  const [createUser, { loading }] = useEncryptedMutation('createUser');

  const handleSubmit = async (formData) => {
    const result = await createUser({
      email: formData.email,        // Automatically encrypted
      password: formData.password,  // Automatically encrypted
    });
    
    // result.data is automatically decrypted
    console.log('Created user:', result.data);
  };

  return <Form onSubmit={handleSubmit} loading={loading} />;
}

// 3. Selective encryption (only encrypt sensitive fields)
function UpdateProfile() {
  const { data } = useSelectiveEncryptedQuery('getProfile', {
    variables: {
      userId: '123',           // Not encrypted (public)
      ssn: '123-45-6789',      // Encrypted
    },
    fieldsToEncrypt: ['ssn'], // Only encrypt SSN
    fieldsToDecrypt: ['ssn', 'cardNumber'], // Decrypt sensitive response fields
  });

  return <Profile data={data} />;
}

// 4. With monitoring
function AdminPanel() {
  const { data } = useMonitoredEncryptedQuery('getUsers', {
    encryptionKey: 'admin-key',
    onEncrypt: (vars) => console.log('Encrypted variables:', vars),
    onDecrypt: (data) => console.log('Decrypted response:', data),
    onError: (err, phase) => console.error(`${phase} error:`, err),
  });

  return <UserList users={data} />;
}

// 5. Environment-specific encryption
const ENCRYPTION_KEY = __DEV__ 
  ? 'dev-key-12345'
  : process.env.PRODUCTION_ENCRYPTION_KEY;

function SecureComponent() {
  const { data } = useEncryptedQuery('sensitiveData', {
    encryptionKey: ENCRYPTION_KEY,
    encryptVariables: !__DEV__, // Disable encryption in dev for easier debugging
  });

  return <SensitiveData data={data} />;
}

*/

// ============================================
// Export all encrypted hooks
// ============================================

export default {
  useEncryptedQuery,
  useEncryptedMutation,
  useSelectiveEncryptedQuery,
  useMonitoredEncryptedQuery,
};

