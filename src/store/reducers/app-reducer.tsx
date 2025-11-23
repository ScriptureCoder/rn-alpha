import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * Minimal core app state - essentials only
 * Apps can extend this with their own fields via custom reducers
 */
export interface CoreAppState {
  auth: {
    accessToken: string;
    refreshToken: string;
    userId?: string;
  };
  user: any; // Generic user object - apps define their own User type
  colorMode: "light" | "dark";
  deviceId: string
}

const initialState: CoreAppState = {
  auth: {
    accessToken: '',
    refreshToken: '',
    userId: undefined,
  },
  user: null,
  colorMode: "light",
  deviceId: ""
};

/**
 * Core app reducer with minimal essential state
 * This provides the foundation that all apps need
 */
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<Partial<CoreAppState['auth']>>) {
      state.auth = { ...state.auth, ...action.payload };
    },

    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },

    setColorMode(state, action: PayloadAction<CoreAppState["colorMode"]>) {
      state.colorMode = action.payload;
    },

    setDeviceId(state, action: PayloadAction<string>) {
      state.deviceId = action.payload;
    },

    clearAuth(state) {
      state.auth = initialState.auth;
      state.user = null;
    },
  },
});

export const actions = appSlice.actions;
export default appSlice.reducer;

/**
 * Legacy type for backward compatibility
 * @deprecated Apps should create their own custom reducers instead
 */
export interface LegacyAppState extends CoreAppState {
  /** @deprecated Create a custom reducer for app-specific fields */
  registered?: boolean;
  /** @deprecated Create a custom reducer for app-specific fields */
  email?: string;
  /** @deprecated Create a custom reducer for app-specific fields */
  image?: string;
  /** @deprecated Create a custom reducer for app-specific fields */
  defaultPassword?: boolean;
  /** @deprecated Create a custom reducer for app-specific fields */
  biometric?: boolean;
  /** @deprecated Create a custom reducer for app-specific fields */
  visibility?: any;
}
