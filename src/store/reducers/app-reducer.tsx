import {Visibility} from 'types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

import uuid from 'react-native-uuid';

export interface AppState {
  auth: {
    accessToken: string;
    customerId: string;
    user: any;
  };
  registered: boolean;
  deviceId: any;
  email: string;
  image: string;
  defaultPassword: boolean;
  biometric: boolean;
  visibility: {
    wallet: boolean;
    savings: boolean;
    total: boolean;
    investment: boolean;
  };
}

const initialState: AppState = {
  auth: {
    accessToken: '',
    customerId: '',
    user: {},
  },
  registered: false,
  deviceId: uuid.v4(),
  email: '',
  image: '',
  defaultPassword: false,
  biometric: false,
  visibility: {
    wallet: true,
    savings: true,
    total: true,
    investment: true,
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDeviceId(state, action: PayloadAction<string>) {
      state.deviceId = action.payload;
    },
    setAuth(
      state,
      action: PayloadAction<{auth_idtoken: string; session_token_id: string}>,
    ) {
      state.auth = {
        accessToken: action.payload.auth_idtoken,
        customerId: action.payload.session_token_id,
        user: {},
      };
    },
    setUser(state, action: PayloadAction<{}>) {
      state.auth.user = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setImage(state, action: PayloadAction<string>) {
      state.image = action.payload;
    },
    setRegistered(state, action: PayloadAction<boolean>) {
      state.registered = action.payload;
    },
    setDefaultPassword(state, action: PayloadAction<boolean>) {
      state.defaultPassword = action.payload;
    },
    setBiometric(state, action: PayloadAction<boolean>) {
      state.biometric = action.payload;
    },
    toggleVisibility(state, action: PayloadAction<Visibility>) {
      state.visibility[action.payload] = !state.visibility[action.payload];
    },
    setLogout(state) {
      state.auth = initialState.auth;
    },
  },
});

export const actions = appSlice.actions;
export default appSlice.reducer;
