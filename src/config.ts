export interface AlphaConfig {
  // API Configuration (required)
  baseUrl: string;
  
  // Optional API settings
  timeout?: number; // Default: 30000ms
  headers?: Record<string, string>;
  
  // Custom Routes
  paths?: Record<string, string>; // e.g. { login: 'POST:/auth/login' }
  
  // Cache Configuration
  cache?: {
    ttl?: number; // Default cache TTL
    staleTime?: number; // Default stale time
    maxSize?: number; // LRU max size
  };
  
  // Default Network Policy
  defaultNetworkPolicy?: 'cache-first' | 'network-only' | 'cache-only' | 'network-and-cache' | 'stale-while-revalidate';
  
  // Retry Configuration
  retry?: {
    enabled?: boolean;
    count?: number;
    delay?: number | 'exponential';
  };
  
  // Encryption Configuration
  encryption?: {
    key: string; // Must be 16 characters for AES-128
    iv: string;  // Must be 16 characters
  };
  
  // Default encryption behavior for all requests/responses
  defaultEncryption?: boolean | {
    enabled?: boolean;
    request?: 'full' | string[];
    response?: 'full' | string[];
  };
  
  // Response data path
  dataPath?: string; // Default: "data" (means res.data.data), empty string for res.data
  
  // Debug mode
  debug?: boolean;
}

// Default configuration
export const DEFAULT_CONFIG: AlphaConfig = {
  baseUrl: '',
  timeout: 30000,
  cache: {
    ttl: 5 * 60 * 1000,
    staleTime: 0,
    maxSize: 100,
  },
  defaultNetworkPolicy: 'cache-first',
  retry: {
    enabled: true,
    count: 3,
    delay: 'exponential',
  },
  encryption: undefined, // No default - must be provided for security
  defaultEncryption: false, // No encryption by default
  dataPath: 'data', // Default to res.data.data for backward compatibility
  debug: false,
};

export const naira = '₦';

// Legacy export for backward compatibility
export const config = {
  naira,
  baseUrl: '',
};

export default config;
