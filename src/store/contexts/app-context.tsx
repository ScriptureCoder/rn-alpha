import * as cache from '../reducers/cache-reducer';

import {AppState, actions} from '../reducers/app-reducer';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import NetInfo from '@react-native-community/netinfo';
import SocketContext from './socket-context';
import Toast from '../../utils/toast';
import {Visibility} from 'types';
import {useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useSelector from "hooks/use-selector";
import useDispatch from "hooks/use-dispatch";

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

const defaultValue: any = {};

const AppContext = createContext<Props>(defaultValue);
export const useApp = () => useContext(AppContext);

const AppProvider: React.FC<any> = ({children}) => {
  const {reset} = useNavigation<any>();
  const state = useSelector(appstate => appstate.app);
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(internetState => {
      if (internetState.isInternetReachable) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const func = useMemo(
    () => ({
      setAuth: (payload: any) => {
        dispatch(actions.setAuth(payload));
      },
      setUser: (payload: any) => {
        dispatch(actions.setUser(payload));
      },
      setEmail: (payload: string) => {
        dispatch(actions.setEmail(payload));
      },
      setImage: (payload: string) => {
        dispatch(actions.setImage(payload));
      },
      setRegistered: (payload: boolean) => {
        dispatch(actions.setRegistered(payload));
      },
      setColorMode: (payload: any) => {
        dispatch(actions.setSystemColor(false));
        dispatch(actions.setColorMode(payload));
      },
      setSystemColor: (payload: any) => {
        dispatch(actions.setColorMode(isDarkMode ? 'dark' : 'light'));
        dispatch(actions.setSystemColor(payload));
      },
      setDefaultPassword: (payload: boolean) => {
        dispatch(actions.setDefaultPassword(payload));
      },
      setBiometric: (payload: boolean) => {
        dispatch(actions.setBiometric(payload));
      },
      toggleVisibility: (payload: Visibility) => {
        dispatch(actions.toggleVisibility(payload));
      },
      setTimeout: async () => {
        Toast('Session expired! kindly login', 'SHORT');
        func.setLogout().catch(() => {});
      },
      setLogout: async () => {
        dispatch(actions.setLogout());
        dispatch(cache.actions.clear());
        reset({
          index: 0,
          routes: [
            // { name: 'welcome' },
            {name: 'login'},
          ],
        });
      },
    }),
    [dispatch, isDarkMode, reset],
  );

  const value = useMemo(
    () => ({...state, connected, ...func}),
    [state, connected, func],
  );

  return (
    <AppContext.Provider value={value}>
      <SocketContext>{children}</SocketContext>
    </AppContext.Provider>
  );
};

export default AppProvider;
