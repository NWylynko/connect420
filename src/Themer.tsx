import React, { useContext } from 'react';
import { StoreContext } from './context';

interface Theme extends React.CSSProperties {
  '--text': string;
  '--background': string;
  '--playerColor'?: string;
}

interface Themes {
  [index: string]: Theme;
  light: Theme;
  dark: Theme;
}

export default function Themer({ children }: { children: React.ReactNode }): JSX.Element {
  const { theme, info } = useContext(StoreContext);

  function colors(): React.CSSProperties {
    // custom themes can be added here, just add the type to the Themes interface
    const themes: Themes = {
      light: {
        '--text': '#3d3d3d',
        '--background': '#f2f3f5',
      },
      dark: {
        '--text': '#E8E9EB',
        '--background': '#121113',
      },
    };

    const style: Theme = themes[theme];

    if (info.type) style['--playerColor'] = `var(--${info.type})`;

    return style;
  }

  return (
    <div className="app" style={colors()}>
      {children}
    </div>
  );
}
