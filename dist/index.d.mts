export { default as dayjs } from 'dayjs';
import * as redux_thunk from 'redux-thunk';
import * as redux from 'redux';
import { TypedUseSelectorHook } from 'react-redux';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import React from 'react';

declare const PATHS: {
    login: string;
    biometricAuth: string;
    generateOtp: string;
    validateOtp: string;
    register: string;
    forgot: string;
    getAccounts: string;
    getTransferAccounts: string;
    getCustomer: string;
    getBvnDetails: string;
    validateOTPBVN: string;
    registerDevice: string;
    accountStatement: string;
    loanHistory: string;
    customerSummary: string;
    accountHistory: string;
    downloadStatement: string;
    changePassword: string;
    changePin: string;
    deleteBeneficiary: string;
    addBeneficiary: string;
    getBeneficiaries: string;
    confirmBeneficiary: string;
    getBanks: string;
    transferHistory: string;
    transferBeneficiary: string;
    transfer: string;
    airtime: string;
    bill: string;
    billHistory: string;
    billerCategories: string;
    billers: string;
    billerProduct: string;
    validateBillCustomer: string;
    getDeposit: string;
    getSavings: string;
    createSavings: string;
    getLoans: string;
    liqudateDeposit: string;
    getInvestmentRate: string;
    createDeposit: string;
    getCards: string;
    fundWallet: string;
    requestLoan: string;
    calculateLTV: string;
    updateSavings: string;
    closeSavings: string;
    savings: string;
    savingsWithdrawal: string;
    registerToken: string;
    feedback: string;
    blockCard: string;
    requestCard: string;
    verifyNin: string;
    updateLocationId: string;
};

type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
    dashboard: undefined;
    supportRoot: undefined;
};
type ModalProps = {
    setModal: (value: boolean) => void;
    modal: boolean;
};
type SheetProps = {
    setOpen: (value: boolean) => void;
    open: boolean;
};
type DashboardStackList = {
    dashboard: undefined;
};
type ColorModes = 'light' | 'dark';
type Weight = 'Regular' | 'Bold' | 'SemiBold' | 'Light' | 'Medium' | 'ExtraLight' | 'Italic' | 'ExtraBold';
type Route = keyof typeof PATHS;
type Visibility = 'wallet' | 'savings' | 'investment' | 'total';

type Props$4 = {
    data: any | any[];
    loading: boolean;
    error: string | undefined;
    key: string;
    refetch: (variables?: any) => void;
    fetchMore: (variables?: any, concat?: 'start' | 'end' | 'pagination', paginationKey?: string) => Promise<any>;
    update: (data: any) => void;
    updateValue: (arg: string, value: any) => void;
    updateValues: (values: any) => void;
    updateItem: (id: string, value: any) => void;
    deleteItem: (id: string) => void;
    prepend: (data: any) => void;
    append: (data: any) => void;
};
type NetworkPolicy = 'network-and-cache' | 'cache-only' | 'network-only' | 'cache-first';
type Args = {
    variables?: any;
    networkPolicy?: NetworkPolicy;
    init?: any;
    onCompleted?: (data: any) => void;
    onError?: (error: any, status?: number) => void;
};
declare const useQuery: (route: Route, args?: Args) => Props$4;

type Props$3 = (route: Route, variables?: any, authToken?: string) => void;
declare const useQueryAsync: () => Props$3;

declare const scheme: {
    light: {
        text: string;
        text2: string;
        background: string;
        border: string;
        shade: string;
        touchable: string;
        gap: string;
        tint: string;
        check: string;
        navigation: string;
        progress: string;
        chat: string;
        spotlight: string;
        primary: string;
        primaryLight: string;
        primaryShade: string;
        secondary: string;
        tertiary: string;
        danger: string;
        dangerLight: string;
        success: string;
        warning: string;
        warningLight: string;
        medium: string;
        mediumShade: string;
        mediumTint: string;
        dark: string;
        darkShade: string;
        darkTint: string;
        light: string;
        lightShade: string;
        lightTint: string;
        modal: string;
        overlay: string;
        transparent: string;
        placeholder: string;
        dim: string;
        orange: string;
        wood: string;
        black: string;
        cover: string;
    };
    dark: {
        primaryLight: string;
        text: string;
        text2: string;
        background: string;
        border: string;
        shade: string;
        touchable: string;
        gap: string;
        mediumShade: string;
        tint: string;
        check: string;
        navigation: string;
        progress: string;
        chat: string;
        spotlight: string;
        primary: string;
        primaryShade: string;
        secondary: string;
        tertiary: string;
        danger: string;
        dangerLight: string;
        success: string;
        warning: string;
        warningLight: string;
        medium: string;
        mediumTint: string;
        dark: string;
        darkShade: string;
        darkTint: string;
        light: string;
        lightShade: string;
        lightTint: string;
        modal: string;
        overlay: string;
        transparent: string;
        placeholder: string;
        dim: string;
        orange: string;
        wood: string;
        black: string;
        cover: string;
    };
};
type ColorsProps = (typeof scheme)['light'];
type ColorProps = keyof (typeof scheme)['light'];
declare const Colors: (value: ColorModes) => ColorsProps;

type Props$2 = {
    colors: ColorsProps;
    setColorMode: (colorMode: ColorModes) => void;
    colorMode: ColorModes;
    systemColor: boolean;
    setSystemColor: (systemColor: boolean) => void;
};
declare const useColor: () => Props$2;

type Response$1 = {
    error?: string;
    data?: any;
    status?: number;
};
type UseMutationProps$1 = {
    loading: boolean;
    error?: string | string[];
    mutate: (variables: any) => Promise<Response$1>;
    data?: any;
};
type Option$1 = {
    keyboard?: boolean;
    text?: boolean;
};
declare const useMutation$1: (route: Route, option?: Option$1) => UseMutationProps$1;

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE';

type Response = {
    error?: string;
    data?: any;
    status?: number;
};
type UseMutationProps = {
    loading: boolean;
    error?: string | string[];
    mutate: (variables: any) => Promise<Response>;
    data?: any;
    query: (route: Route, variables?: any, authToken?: string, method?: Method) => Promise<Response>;
};
type Option = {
    keyboard?: boolean;
};
declare const useMutation: (route: string, option?: Option) => UseMutationProps;

interface AppState {
    auth: {
        accessToken: string;
        customerId: string;
        user: any;
    };
    colorMode: ColorModes;
    systemColor: boolean;
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

declare const _default$1: () => redux_thunk.ThunkDispatch<{
    app: AppState;
    cache: any;
    tread: any;
}, undefined, redux.UnknownAction> & redux.Dispatch<redux.UnknownAction>;

declare const store: _reduxjs_toolkit.EnhancedStore<{
    app: AppState;
    cache: any;
    tread: any;
}, redux.UnknownAction, _reduxjs_toolkit.Tuple<[redux.StoreEnhancer<{
    dispatch: redux_thunk.ThunkDispatch<{
        app: AppState;
        cache: any;
        tread: any;
    }, undefined, redux.UnknownAction>;
}>, redux.StoreEnhancer]>>;
type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

declare const useSelector: TypedUseSelectorHook<RootState>;

type Context = {
    key: string;
    method: Method;
    path: string;
    rawPath: string;
};
type Props$1 = {
    setCache: (key: string, value: any) => any;
    getKey: (route: Route, variables?: any) => string;
    getContext: (route: Route, variables?: any) => Context;
    getData: (key: string) => any;
    getItem: (key: string, id: string) => any;
    update: (key: string, data: any) => void;
    updateValue: (key: string, arg: string, value: any) => void;
    updateValues: (key: string, values: any) => void;
    updateItem: (key: string, id: string, value: any) => void;
    deleteItem: (key: string, id: string) => void;
    prepend: (key: string, data: any) => void;
    append: (key: string, data: any) => void;
    updateOrPrepend: (key: string, data: any) => void;
};
declare const useCache: () => Props$1;

interface Props extends AppState {
    setEmail: (payload: string) => void;
    setImage: (payload: string) => void;
    setRegistered: (payload: boolean) => void;
    setUser: (payload: any) => void;
    setAuth: (payload: any) => void;
    setLogout: () => Promise<void>;
    setTimeout: () => Promise<void>;
    setColorMode: (payload: string) => void;
    setSystemColor: (systemColor: boolean) => void;
    setDefaultPassword: (value: boolean) => void;
    setBiometric: (value: boolean) => void;
    toggleVisibility: (value: Visibility) => void;
    connected: boolean;
}
declare const useApp: () => Props;
declare const AppProvider: React.FC<any>;

declare const elevation: (key: number) => any;

declare const width: number;
declare const height: number;
declare const ios: boolean;
declare const android: boolean;
declare const isSmallDevice: boolean;
declare const statusHeight: number;

declare const config: {
    naira: string;
    baseUrl: string;
};

declare function money(num: number, decimal: number): string;

declare const encrypt: (payload: string) => any;
declare const decrypt: (response: string) => any;

declare class Storage {
    setItem: (key: string, value: any) => void;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
    clear: () => Promise<void>;
}
declare const _default: Storage;

export { type AppDispatch, AppProvider, type ColorModes, type ColorProps, Colors, type ColorsProps, type DashboardStackList, type ModalProps, PATHS, type RootStackParamList, type RootState, type Route, type SheetProps, type Visibility, type Weight, config as alphaConfig, android, scheme as colorScheme, decrypt, elevation, encrypt, money as formatMoney, height, ios, isSmallDevice, statusHeight, _default as storage, store, useApp, useCache, useColor, _default$1 as useDispatch, useMutation$1 as useMutation, useMutation as useMutationAsync, useQuery, useQueryAsync, useSelector, width };
