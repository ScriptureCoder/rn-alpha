// Detect if we are in a development environment.
// React Native provides __DEV__, while Node/Web environments use NODE_ENV.
let isDebugEnabled = typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';

export const setLoggerDebugMode = (enabled: boolean) => {
    isDebugEnabled = enabled;
};

export const logger = {
    log: (...args: any[]): any => {
        if (isDebugEnabled) console.log(...args);
    },
    warn: (...args: any[]): any => {
        if (isDebugEnabled) console.warn(...args);
    },
    error: (...args: any[]): any => {
        if (isDebugEnabled) console.error(...args);
    },
    info: (...args: any[]): any => {
        if (isDebugEnabled) console.info(...args);
    },
    debug: (...args: any[]): any => {
        if (isDebugEnabled) console.debug(...args);
    }
};
