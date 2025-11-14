import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../index';
import AppProvider from './app-context';
import ConfigProvider from './config-context';
import { AlphaConfig } from '../../config';

interface AlphaProviderProps {
  children: ReactNode;
  config: AlphaConfig;
}

/**
 * Root provider for rn-alpha package
 * Wraps your app with Redux, Config, and App contexts
 * 
 * @example
 * ```typescript
 * <AlphaProvider config={{
 *   baseUrl: 'https://api.example.com',
 *   paths: { login: 'POST:/auth/login' },
 *   debug: __DEV__,
 * }}>
 *   <App />
 * </AlphaProvider>
 * ```
 */
export const AlphaProvider: React.FC<AlphaProviderProps> = ({ children, config }) => {
  return (
    <Provider store={store}>
      <ConfigProvider config={config}>
        <AppProvider>
          {children}
        </AppProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default AlphaProvider;

