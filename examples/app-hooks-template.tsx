/**
 * App-Specific Hooks Template
 * 
 * Copy this file to your app: src/hooks/useAppQuery.ts
 * Customize the encryption/decryption logic based on your needs
 */

import { useQuery, useMutation, QueryOptions, MutationResult } from '@scripturecoder/rn-alpha';
import { Route } from '@scripturecoder/rn-alpha';
import { encrypt, decrypt } from '@scripturecoder/rn-alpha';
import { useMemo } from 'react';

// ============================================
// Configuration
// ============================================

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-default-key';

// Fields that should always be encrypted in requests
const SENSITIVE_REQUEST_FIELDS = ['password', 'ssn', 'cardNumber', 'pin'];

// Fields that should always be decrypted in responses
const SENSITIVE_RESPONSE_FIELDS = ['ssn', 'cardNumber', 'accountNumber'];

// ============================================
// Helper Functions
// ============================================

/**
 * Encrypt sensitive fields in an object
 */
function encryptSensitiveFields(data: Record<string, any>, key: string): Record<string, any> {
  if (!data) return data;

  const encrypted = { ...data };

  SENSITIVE_REQUEST_FIELDS.forEach((field) => {
    if (encrypted[field]) {
      try {
        const value = typeof encrypted[field] === 'string'
          ? encrypted[field]
          : JSON.stringify(encrypted[field]);
        encrypted[field] = encrypt(value, key);
      } catch (error) {
        console.error(`Failed to encrypt field ${field}:`, error);
      }
    }
  });

  return encrypted;
}

/**
 * Decrypt sensitive fields in an object
 */
function decryptSensitiveFields(data: any, key: string): any {
  if (!data || typeof data !== 'object') return data;

  const decrypted = { ...data };

  SENSITIVE_RESPONSE_FIELDS.forEach((field) => {
    if (decrypted[field] && typeof decrypted[field] === 'string') {
      try {
        decrypted[field] = decrypt(decrypted[field], key);
        // Try to parse as JSON if it's a stringified object
        try {
          decrypted[field] = JSON.parse(decrypted[field]);
        } catch {
          // Keep as string if not JSON
        }
      } catch (error) {
        console.error(`Failed to decrypt field ${field}:`, error);
      }
    }
  });

  return decrypted;
}

// ============================================
// Custom Hooks
// ============================================

/**
 * App-specific useQuery with automatic encryption/decryption
 * 
 * @example
 * const { data, loading } = useAppQuery('getUser', {
 *   variables: { userId: '123', password: 'secret' } // password encrypted automatically
 * });
 */
export function useAppQuery<T = any>(
  route: Route,
  options?: QueryOptions
) {
  const { variables, ...restOptions } = options || {};

  // Encrypt sensitive fields in variables
  const encryptedVariables = useMemo(() => {
    if (!variables) return variables;
    return encryptSensitiveFields(variables, ENCRYPTION_KEY);
  }, [variables]);

  // Use base query with encrypted variables
  const queryResult = useQuery<T>(route, {
    ...restOptions,
    variables: encryptedVariables,
  });

  // Decrypt sensitive fields in response
  const decryptedData = useMemo(() => {
    if (!queryResult.data) return queryResult.data;
    return decryptSensitiveFields(queryResult.data, ENCRYPTION_KEY);
  }, [queryResult.data]);

  return {
    ...queryResult,
    data: decryptedData,
  };
}

/**
 * App-specific useMutation with automatic encryption/decryption
 * 
 * @example
 * const [updateProfile, { loading }] = useAppMutation('updateProfile');
 * await updateProfile({ password: 'new-password' }); // password encrypted automatically
 */
export function useAppMutation<T = any>(
  route: Route,
  options?: { keyboard?: boolean; text?: boolean }
): MutationResult<T> {
  const [baseMutate, mutationState] = useMutation<T>(route, options);

  // Wrapped mutate with encryption/decryption
  const wrappedMutate = async (variables: Record<string, any>) => {
    // Encrypt sensitive fields
    const encryptedVariables = encryptSensitiveFields(variables, ENCRYPTION_KEY);

    // Call base mutation
    const response = await baseMutate(encryptedVariables);

    // Decrypt response if present
    if (response.data) {
      response.data = decryptSensitiveFields(response.data, ENCRYPTION_KEY) as T;
    }

    return response;
  };

  return [wrappedMutate, mutationState];
}

// ============================================
// Usage in Your App
// ============================================

/*

// In your components, use useAppQuery and useAppMutation instead of the base hooks

import { useAppQuery, useAppMutation } from './hooks/useAppQuery';

function LoginScreen() {
  const [login, { loading, error }] = useAppMutation('login');

  const handleLogin = async (email: string, password: string) => {
    const result = await login({
      email,
      password, // Automatically encrypted before sending
    });

    if (result.data) {
      // Data is automatically decrypted
      console.log('User logged in:', result.data);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button onPress={() => handleLogin(email, password)} />
    </View>
  );
}

function UserProfile() {
  const { data, loading } = useAppQuery('getProfile', {
    variables: { userId: '123' }
  });

  // data.ssn is automatically decrypted if present in response
  return <Profile user={data} loading={loading} />;
}

*/

