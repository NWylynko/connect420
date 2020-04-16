import React from 'react';
import ReactDOM from 'react-dom';
import Navigator from './Navigator';
import StoreProvider from './context';
import Themer from './Themer'
import './index.css';
import './fonts/Retronoid.ttf'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Themer>
        <Navigator />
      </Themer>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
