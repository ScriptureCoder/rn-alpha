import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import NetInfo from '@react-native-community/netinfo';
import useSelector from '../../hooks/use-selector';
import useDispatch from '../../hooks/use-dispatch';
import { actions, CoreAppState } from '../reducers/app-reducer';

/**
 * Core app context type
 * Apps can extend this with their own methods by creating a custom context
 */
export interface AppContextValue {
    // Core state
    auth: CoreAppState['auth'];
    colorMode: CoreAppState['colorMode'];
    user: any;
    connected: boolean;
    deviceId: string;
    email: string;

    // Core actions
    setAuth: (payload: Partial<CoreAppState['auth']>) => void;
    setColorMode: (payload: Partial<CoreAppState['colorMode']>) => void;
    setUser: (payload: any) => void;
    setDeviceId: (payload: string) => void;
    setEmail: (payload: string) => void;
    clearAuth: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

/**
 * Hook to access app context
 * Can be typed for custom extensions: useApp<MyAppContextType>()
 */
export const useApp = <T = AppContextValue>(): T => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context as unknown as T;
};

/**
 * Minimal app provider with core functionality only
 * Apps can wrap this or create their own context for additional state
 *
 * @example
 * // Basic usage
 * <AppProvider>
 *   <App />
 * </AppProvider>
 *
 * @example
 * // Extended usage in your app
 * function MyAppProvider({ children }) {
 *   const coreApp = useApp();
 *   const customState = useSelector(state => state.myCustom);
 *
 *   return (
 *     <MyContext.Provider value={{ ...coreApp, ...customState }}>
 *       {children}
 *     </MyContext.Provider>
 *   );
 * }
 */
const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const state = useSelector((appState) => appState.app);
    const dispatch = useDispatch();
    const [connected, setConnected] = useState(false);

    // Network connectivity monitoring
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((internetState) => {
            setConnected(!!internetState.isInternetReachable);
        });
        return () => unsubscribe();
    }, []);

    // Core context value - minimal and essential only
    const value = useMemo<AppContextValue>(
        () => ({
            ...state,
            connected,
            setAuth: (payload) => dispatch(actions.setAuth(payload)),
            setColorMode: (payload) => dispatch(actions.setColorMode(payload)),
            setUser: (payload) => dispatch(actions.setUser(payload)),
            setEmail: (payload) => dispatch(actions.setEmail(payload)),
            setDeviceId: (payload) => dispatch(actions.setDeviceId(payload)),
            clearAuth: () => dispatch(actions.clearAuth()),
        }),
        [state, connected, dispatch]
    );

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
