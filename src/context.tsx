// context in react is a way to store global state
// this fixes the issue of prop drilling
// this can also be fixed with libraries like redux
// but i prefer to use context as its built into react

import React, { useState, createContext, useEffect } from 'react';

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
}

interface Info {
  type?: 'player1' | 'player2' | 'viewer' | undefined;
}

export default ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [theme, setTheme] = useState<string>(getTheme());
  const [info, setInfo] = useState<Info>({});
  const [name, setName] = useState<string>('');
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    console.log(connected ? 'connected' : 'disconnected');
  }, [connected]);

  const store: Istore = {
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
