import React, { useState, createContext, useEffect } from 'react';
import io from 'socket.io-client';
import { server } from './config';

export const StoreContext = createContext({} as Istore);

interface Istore {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  info: Info;
  setInfo: React.Dispatch<React.SetStateAction<Info>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  socket: SocketIOClient.Socket;
}

interface Info {
  type?: 'player1' | 'player2' | 'viewer' | undefined;
}

let socket: SocketIOClient.Socket;

export default ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [theme, setTheme] = useState<string>(getTheme());
  const [info, setInfo] = useState<Info>({});
  const [name, setName] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    socket = io(server, { transports: ['websocket'] });

    socket.on('connect', () => {
      setConnected(true);
      console.log(socket.id);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('info', setInfo);

    return (): void => {
      socket.disconnect();
    };

  }, [])

  useEffect(() => {
    if (name) socket.emit('name', name);
  }, [name])

  const store: Istore = {
    socket,
    theme,
    setTheme,
    info,
    setInfo,
    name,
    setName,
    connected,
    setConnected,
  };

  return <StoreContext.Provider value={store as Istore}>{children}</StoreContext.Provider>;
};

function getTheme(): string {
  const preference = localStorage.getItem('theme');

  if (preference !== null) {
    return preference;
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
