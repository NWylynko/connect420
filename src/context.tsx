import React, { useState, createContext } from 'react';

export const StoreContext = createContext({} as Istore);

interface Istore {
  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>,
  info: Info,
  setInfo: React.Dispatch<React.SetStateAction<Info>>,
  name: string,
  setName: React.Dispatch<React.SetStateAction<string>>
}

interface Info {
  type?: "player1" | "player2" | "viewer" | undefined
}

export default ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(getTheme())
  const [info, setInfo] = useState<Info>({})
  const [name, setName] = useState<string>("")

  const store: Istore = {
    theme,
    setTheme,
    info,
    setInfo,
    name, setName
  };

  return (
    <StoreContext.Provider value={store as Istore}>{children}</StoreContext.Provider>
  );
};

function getTheme() {

  let preference = localStorage.getItem("theme")

  if (preference !== null) {
    return preference
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}