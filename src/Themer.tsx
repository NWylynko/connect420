import React, { useContext } from 'react';
import { StoreContext } from './context';

interface theme extends React.CSSProperties {
  '--text': string, 
  '--background': string,
  '--playerColor'?: string
}

interface themes {
  [index: string]: theme,
  light: theme,
  dark: theme
}


export default function Themer({ children } : { children: React.ReactNode }) {

  const { theme, info } = useContext(StoreContext)

  function colors(): React.CSSProperties {

    let themes: themes = {
      light: {
        '--text': '#3d3d3d',
        '--background': '#f2f3f5',
      },
      dark: {
        '--text': '#E8E9EB',
        '--background': '#121113',
      },
    }
  
    let style: theme = themes[theme]
  
    if (info.type) style['--playerColor'] = `var(--${info.type})` // info.type either player1, player2, viewer or undefined (shouldnt be an issues, will only be undefined at menu screen)
  
    return style
  
  }

  return (
    <div className="app" style={colors()} >
      {children}
    </div>
  )

}

