import React, {useState, createContext} from 'react';

export const StoreContext = createContext(null);

export default ({children}) => {
  const [theme, setTheme] = useState(getTheme())
  const [info, setInfo] = useState({})
  const [name, setName] = useState("")

  const store = {
    theme,
    setTheme,
    info, 
    setInfo,
    name, setName
  };

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
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