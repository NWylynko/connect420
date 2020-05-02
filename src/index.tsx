import React from 'react';
import ReactDOM from 'react-dom';
import Navigator from './Navigator';
import StoreProvider from './context';
import Themer from './Themer';
import './index.css';
import './fonts/Retronoid.ttf';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Themer>
        <Navigator />
      </Themer>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Learn more about service workers: https://create-react-app.dev/docs/making-a-progressive-web-app/
serviceWorker.register();
