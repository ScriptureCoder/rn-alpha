import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getPlatformAdapter } from '../../platform/registry';

type Props = {
  connected: boolean;
};

const defaultValue: any = {};

const SocketContext = createContext<Props>(defaultValue);
export const useSocket = () => useContext(SocketContext);

const SocketProvider: React.FC<any> = ({children}) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    return getPlatformAdapter().onConnectivityChange(setConnected);
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
