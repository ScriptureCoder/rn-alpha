# Encryption Guide

## Overview

The package now supports configurable encryption for both requests and responses. You can encrypt entire request bodies or specific fields, and decrypt entire responses or specific fields.

## Setup

### 1. Configure Encryption Keys

**Option A: Via AlphaProvider (Recommended)**

```typescript
<AlphaProvider
  config={{
    baseUrl: 'https://api.example.com',
    encryption: {
      key: '2vn!H3KXgX-TxvkD', // 16 characters for AES-128
      iv: '%x%97Uw@*A2xWaUJ',  // 16 characters
    },
    defaultEncryption: false, // Optional: set default encryption behavior
    paths: { /* ... */ },
  }}
>
  <App />
</AlphaProvider>
```

**Option B: Programmatically**

```typescript
import { setEncryptionConfig } from '@scripturecoder/rn-alpha-hooks';

setEncryptionConfig({
  key: process.env.ENCRYPTION_KEY,
  iv: process.env.ENCRYPTION_IV,
});
```

### 2. Set Global Default (Optional)

```typescript
<AlphaProvider
  config={{
    // ...
    defaultEncryption: true, // All requests use full encryption
    // or
    defaultEncryption: {
      request: 'full',           // Encrypt entire body
      response: ['token', 'ssn'], // Decrypt specific fields
    },
  }}
/>
```

## Usage Patterns

### Full Body Encryption

Encrypts the entire request body and decrypts the entire response.

```typescript
// Boolean shorthand
const [mutate] = useMutation('login', {
  encrypted: true,
});

// Explicit
const [mutate] = useMutation('login', {
  encrypted: {
    request: 'full',
    response: 'full',
  },
});

await mutate({
  email: 'user@example.com',
  password: 'secret123',
});

// Sent as: { encrypted: "U2FsdGVkX1..." }
```

### Partial Field Encryption

Encrypts only specific object keys.

```typescript
const [login] = useMutation('login', {
  encrypted: {
    request: ['password'],  // Only encrypt password field
    response: ['token'],    // Only decrypt token field
  },
});

await login({
  email: 'user@example.com',     // Plain text
  password: 'secret123',         // Encrypted
  rememberMe: true,              // Plain text
});

// Sent as:
// {
//   email: "user@example.com",
//   password: "U2FsdGVkX1...",
//   rememberMe: true
// }
```

### Multiple Field Encryption

```typescript
const [processPayment] = useMutation('payment', {
  encrypted: {
    request: ['cardNumber', 'cvv', 'pin'],
    response: ['transactionKey'],
  },
});

await processPayment({
  cardNumber: '1234567890123456',  // Encrypted
  cvv: '123',                      // Encrypted
  pin: '1234',                     // Encrypted
  amount: 100.00,                  // Plain text
  currency: 'USD',                 // Plain text
});
```

## Hook Support

### useQuery

```typescript
const { data, loading } = useQuery('secureData', {
  variables: { token: 'secret' },
  encrypted: {
    request: ['token'],
    response: 'full',
  },
});
```

### useMutation

```typescript
const [mutate, { loading, data }] = useMutation('login', {
  encrypted: true,
});
```

### useMutationAsync

```typescript
const [mutate] = useMutationAsync('POST:/auth/login', {
  encrypted: {
    request: ['password'],
    response: ['token'],
  },
});
```

### useQueryAsync

```typescript
const queryAsync = useQueryAsync();

const result = await queryAsync(
  'secureEndpoint',
  { apiKey: 'secret' },
  {
    encrypted: {
      request: ['apiKey'],
      response: 'full',
    },
  }
);
```

## Encryption Options

```typescript
interface EncryptionOptions {
  enabled?: boolean;              // Enable/disable encryption
  request?: 'full' | string[];   // Encryption strategy for request
  response?: 'full' | string[];  // Decryption strategy for response
}
```

### Request Strategies

| Value | Behavior |
|-------|----------|
| `'full'` | Encrypts entire body, sent as `{ encrypted: "..." }` |
| `['field1', 'field2']` | Encrypts only specified fields in-place |
| `undefined` or `false` | No encryption |

### Response Strategies

| Value | Behavior |
|-------|----------|
| `'full'` | Decrypts entire response or `response.encrypted` field |
| `['field1', 'field2']` | Decrypts only specified fields |
| `undefined` or `false` | No decryption |

## Priority Order

1. **Hook-level option** (highest priority)
2. **Global default** (`config.defaultEncryption`)
3. **No encryption** (default)

```typescript
// Global default
<AlphaProvider config={{ defaultEncryption: true }}>

// This overrides global default
useQuery('data', {
  encrypted: false, // Disable for this query
});

// This uses global default
useQuery('otherData'); // Uses defaultEncryption: true
```

## Real-World Examples

### Banking Application

```typescript
const [transfer] = useMutation('transfer', {
  encrypted: {
    request: ['accountNumber', 'pin', 'amount'],
    response: ['transactionId', 'balance'],
  },
});
```

### Healthcare Records

```typescript
const { data } = useQuery('patientRecords', {
  variables: { patientId: '123' },
  encrypted: {
    response: ['ssn', 'diagnosis', 'medications'],
  },
});
```

### E-commerce Checkout

```typescript
const [checkout] = useMutation('checkout', {
  encrypted: {
    request: ['cardNumber', 'cvv', 'expiryDate'],
    response: ['paymentToken'],
  },
});
```

## Error Handling

```typescript
const [mutate] = useMutation('endpoint', {
  encrypted: true,
});

try {
  await mutate({ data: 'test' });
} catch (error) {
  if (error.message.includes('Encryption')) {
    // Handle encryption configuration errors
    console.error('Encryption keys not configured!');
  }
}
```

## Security Best Practices

1. **Never hardcode keys** - Use environment variables
2. **Use strong keys** - Generate random 16-character keys
3. **Rotate keys regularly** - Update encryption keys periodically
4. **Encrypt sensitive fields only** - Don't encrypt unnecessarily
5. **Use HTTPS** - Encryption doesn't replace secure transport

## Generating Keys

```typescript
import { generateEncryptionConfig } from '@scripturecoder/rn-alpha-hooks';

const config = generateEncryptionConfig();
console.log(config.key); // Random 16-char key
console.log(config.iv);  // Random 16-char IV
```

## TypeScript Support

Full type safety with IntelliSense:

```typescript
import type { EncryptionOptions } from '@scripturecoder/rn-alpha-hooks';

const options: EncryptionOptions = {
  request: 'full',
  response: ['token', 'user'],
};
```

## Debugging

Enable debug mode to see encryption in action:

```typescript
useMutation('login', {
  encrypted: true,
  debug: true, // Logs original, encrypted, and decrypted data
});
```

## Migration from Custom Implementation

If you currently handle encryption manually:

**Before:**
```typescript
const [mutate] = useMutation('login');

await mutate({
  data: encrypt(JSON.stringify({ email, password })),
});
```

**After:**
```typescript
const [mutate] = useMutation('login', {
  encrypted: true,
});

await mutate({ email, password });
```

## FAQ

**Q: Can I use different encryption keys for different endpoints?**
A: Currently, encryption keys are global. Pass custom encrypted data if you need per-endpoint keys.

**Q: Does encryption work with file uploads?**
A: No, encryption is designed for JSON data only.

**Q: What encryption algorithm is used?**
A: AES-128-CBC via `react-native-crypto-js`.

**Q: Can I encrypt nested object fields?**
A: Yes! Use dot notation: `['user.password', 'payment.cardNumber']`

**Q: What happens if encryption keys aren't set?**
A: An error is thrown: "Encryption keys are not configured"

**Q: Can I mix encrypted and non-encrypted requests?**
A: Yes! Set `encrypted: false` on specific hooks to override defaults.

