import React from 'react';
import { View, Button } from 'react-native';
import {
  useQuery,
  useMutation,
  useQueryAsync,
  AlphaProvider,
  setEncryptionConfig,
} from '@scripturecoder/rn-alpha-hooks';

/**
 * ========================================
 * ENCRYPTION CONFIGURATION EXAMPLES
 * ========================================
 */

/**
 * Example 1: Global Encryption Configuration
 * Set up encryption keys once for the entire app
 */
const AppWithGlobalEncryption = () => {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        // Set encryption keys
        encryption: {
          key: '2vn!H3KXgX-TxvkD', // 16 characters for AES-128
          iv: '%x%97Uw@*A2xWaUJ',  // 16 characters
        },
        // Enable encryption by default for all requests
        defaultEncryption: {
          request: 'full',    // Encrypt entire request body
          response: 'full',   // Decrypt entire response
        },
        paths: {
          login: 'POST:/auth/login',
          users: 'GET:/users',
          updateProfile: 'PUT:/profile',
        },
      }}
    >
      <App />
    </AlphaProvider>
  );
};

/**
 * Example 2: Alternative - Using setEncryptionConfig
 * Set encryption keys programmatically
 */
const setupEncryption = () => {
  setEncryptionConfig({
    key: process.env.ENCRYPTION_KEY || '2vn!H3KXgX-TxvkD',
    iv: process.env.ENCRYPTION_IV || '%x%97Uw@*A2xWaUJ',
  });
};

/**
 * ========================================
 * FULL BODY ENCRYPTION EXAMPLES
 * ========================================
 */

/**
 * Example 3: Full Body Encryption - Login Mutation
 * Encrypts the entire request body and decrypts the entire response
 */
const LoginWithFullEncryption = () => {
  const [login, { loading, error, data }] = useMutation('login', {
    encrypted: true, // Boolean true = full encryption
  });

  const handleLogin = async () => {
    const result = await login({
      email: 'user@example.com',
      password: 'secret123',
    });

    // Before encryption (sent as):
    // { encrypted: "U2FsdGVkX1..." }
    
    // Response decrypted automatically
    console.log(result.data);
  };

  return <Button title="Login" onPress={handleLogin} disabled={loading} />;
};

/**
 * Example 4: Full Body Encryption with Explicit Options
 */
const FullEncryptionExplicit = () => {
  const [createUser, { loading }] = useMutation('createUser', {
    encrypted: {
      request: 'full',   // Encrypt entire body
      response: 'full',  // Decrypt entire response
    },
  });

  const handleCreateUser = async () => {
    await createUser({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secret',
      role: 'admin',
    });
    // Entire object is encrypted before sending
  };

  return <Button title="Create User" onPress={handleCreateUser} />;
};

/**
 * ========================================
 * PARTIAL FIELD ENCRYPTION EXAMPLES
 * ========================================
 */

/**
 * Example 5: Partial Encryption - Specific Fields Only
 * Only encrypt sensitive fields like passwords or credit cards
 */
const LoginWithPartialEncryption = () => {
  const [login, { loading, data }] = useMutation('login', {
    encrypted: {
      request: ['password'],  // Only encrypt the 'password' field
      response: ['token'],    // Only decrypt the 'token' field
    },
  });

  const handleLogin = async () => {
    const result = await login({
      email: 'user@example.com',     // Sent as plain text
      password: 'secret123',         // Encrypted
      rememberMe: true,              // Sent as plain text
    });

    // Sent to server as:
    // {
    //   email: "user@example.com",
    //   password: "U2FsdGVkX1...",  // Encrypted
    //   rememberMe: true
    // }

    // Response decrypted:
    // { token: "actual-token", user: {...} }
  };

  return <Button title="Login" onPress={handleLogin} />;
};

/**
 * Example 6: Multiple Field Encryption
 * Encrypt multiple sensitive fields
 */
const PaymentWithPartialEncryption = () => {
  const [processPayment, { loading }] = useMutation('processPayment', {
    encrypted: {
      request: ['cardNumber', 'cvv', 'pin'], // Encrypt card details
      response: ['transactionKey'],          // Decrypt sensitive response
    },
  });

  const handlePayment = async () => {
    await processPayment({
      cardNumber: '1234567890123456',  // Encrypted
      cvv: '123',                      // Encrypted
      pin: '1234',                     // Encrypted
      amount: 100.00,                  // Plain text
      currency: 'USD',                 // Plain text
    });
  };

  return <Button title="Pay" onPress={handlePayment} />;
};

/**
 * ========================================
 * QUERY ENCRYPTION EXAMPLES
 * ========================================
 */

/**
 * Example 7: Encrypted Query (GET with encrypted params)
 * Use encryption for sensitive query parameters
 */
const SecureUserQuery = () => {
  const { data, loading } = useQuery('getUser', {
    variables: { userId: '123', token: 'sensitive-token' },
    encrypted: {
      request: ['token'],   // Encrypt the token parameter
      response: ['ssn'],    // Decrypt sensitive fields in response
    },
  });

  return <View>{/* Render user data */}</View>;
};

/**
 * Example 8: Async Query with Encryption
 */
const AsyncSecureQuery = () => {
  const queryAsync = useQueryAsync();

  const fetchSecureData = async () => {
    const result = await queryAsync(
      'secureEndpoint',
      { apiKey: 'secret-key', userId: '123' },
      {
        encrypted: {
          request: ['apiKey'],      // Encrypt API key
          response: 'full',         // Decrypt entire response
        },
      }
    );

    console.log(result.data);
  };

  return <Button title="Fetch Secure Data" onPress={fetchSecureData} />;
};

/**
 * ========================================
 * MIXED ENCRYPTION STRATEGIES
 * ========================================
 */

/**
 * Example 9: Full Request, Partial Response
 * Encrypt entire request but only decrypt specific response fields
 */
const MixedStrategy1 = () => {
  const [submit, { loading }] = useMutation('submitForm', {
    encrypted: {
      request: 'full',              // Encrypt entire request
      response: ['sensitiveData'],  // Only decrypt specific field
    },
  });

  const handleSubmit = async () => {
    await submit({
      personalInfo: { name: 'John', ssn: '123-45-6789' },
      preferences: { theme: 'dark' },
    });
    // Entire object encrypted before sending
    // Only 'sensitiveData' field decrypted in response
  };

  return <Button title="Submit" onPress={handleSubmit} />;
};

/**
 * Example 10: Partial Request, Full Response
 * Encrypt specific fields but decrypt entire response
 */
const MixedStrategy2 = () => {
  const [authenticate, { loading }] = useMutation('authenticate', {
    encrypted: {
      request: ['password', 'apiKey'],  // Encrypt credentials
      response: 'full',                 // Decrypt entire response
    },
  });

  return <Button title="Auth" onPress={() => authenticate({ 
    username: 'john',
    password: 'secret',
    apiKey: 'key123' 
  })} />;
};

/**
 * ========================================
 * OVERRIDE GLOBAL DEFAULTS
 * ========================================
 */

/**
 * Example 11: Override Global Encryption
 * Disable encryption for a specific query even if globally enabled
 */
const NoEncryptionOverride = () => {
  // Assuming global encryption is enabled
  const { data } = useQuery('publicData', {
    encrypted: false, // Disable encryption for this query
  });

  return <View>{/* Public data doesn't need encryption */}</View>;
};

/**
 * Example 12: Different Strategy Override
 * Use different encryption strategy than global default
 */
const DifferentStrategyOverride = () => {
  // Global: full encryption
  // This query: partial encryption
  const [update, { loading }] = useMutation('updateProfile', {
    encrypted: {
      request: ['password'],  // Only encrypt password, not whole body
      response: false,        // No response decryption needed
    },
  });

  return <Button title="Update" onPress={() => update({
    name: 'John',
    email: 'john@example.com',
    password: 'newPassword',
  })} />;
};

/**
 * ========================================
 * REAL-WORLD USE CASES
 * ========================================
 */

/**
 * Example 13: Banking Application
 * Encrypt all financial data
 */
const BankingApp = () => {
  const [transfer, { loading, error }] = useMutation('transfer', {
    encrypted: {
      request: ['accountNumber', 'pin', 'amount'],
      response: ['transactionId', 'balance'],
    },
  });

  const handleTransfer = async () => {
    const result = await transfer({
      fromAccount: '1234567890',  // Encrypted
      toAccount: '0987654321',    // Encrypted
      amount: 500.00,             // Encrypted
      pin: '1234',                // Encrypted
      description: 'Payment',     // Plain text
    });
  };

  return <Button title="Transfer" onPress={handleTransfer} />;
};

/**
 * Example 14: Healthcare Application
 * Encrypt patient sensitive information
 */
const HealthcareApp = () => {
  const { data, loading } = useQuery('patientRecords', {
    variables: { patientId: '123' },
    encrypted: {
      response: ['ssn', 'diagnosis', 'medications', 'notes'],
    },
  });

  // SSN, diagnosis, medications, and notes are decrypted
  // Other fields like name, age remain as-is
  return <View>{/* Render patient data */}</View>;
};

/**
 * Example 15: E-commerce Checkout
 * Encrypt payment and personal details
 */
const CheckoutFlow = () => {
  const [checkout, { loading }] = useMutation('checkout', {
    encrypted: {
      request: [
        'cardNumber',
        'cvv',
        'expiryDate',
        'billingAddress.street',
        'email',
      ],
      response: ['paymentToken'],
    },
  });

  const handleCheckout = async () => {
    await checkout({
      items: [{ id: 1, quantity: 2 }],  // Plain text
      cardNumber: '1234567890123456',   // Encrypted
      cvv: '123',                       // Encrypted
      expiryDate: '12/25',              // Encrypted
      billingAddress: {
        street: '123 Main St',          // Encrypted
        city: 'New York',               // Plain text
      },
      email: 'user@example.com',        // Encrypted
    });
  };

  return <Button title="Checkout" onPress={handleCheckout} />;
};

/**
 * ========================================
 * ERROR HANDLING
 * ========================================
 */

/**
 * Example 16: Handling Encryption Errors
 */
const ErrorHandlingExample = () => {
  const [submit, { loading, error }] = useMutation('secureEndpoint', {
    encrypted: true,
  });

  const handleSubmit = async () => {
    try {
      const result = await submit({ data: 'test' });
      console.log('Success:', result);
    } catch (err) {
      // Encryption errors will be caught here
      if (err.message.includes('Encryption')) {
        console.error('Encryption failed:', err);
        // Handle encryption configuration issues
      }
    }
  };

  return <Button title="Submit" onPress={handleSubmit} />;
};

/**
 * ========================================
 * DEBUGGING ENCRYPTED REQUESTS
 * ========================================
 */

/**
 * Example 17: Debug Mode with Encryption
 */
const DebugEncryptedRequests = () => {
  const [login, { loading }] = useMutation('login', {
    encrypted: { request: 'full', response: 'full' },
    debug: true, // Enable debug logging
  });

  // Debug logs will show:
  // - Original data (before encryption)
  // - Encrypted data being sent
  // - Encrypted response received
  // - Decrypted data

  return <Button title="Login (Debug)" onPress={() => login({
    email: 'test@example.com',
    password: 'password123',
  })} />;
};

export default AppWithGlobalEncryption;

