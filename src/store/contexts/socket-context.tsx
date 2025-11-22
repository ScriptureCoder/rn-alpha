import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import NetInfo from '@react-native-community/netinfo';

type Props = {
  connected: boolean;
};

const defaultValue: any = {};

const SocketContext = createContext<Props>(defaultValue);
export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<any> = ({children}) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isInternetReachable) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        connected,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
