import React from 'react';
import styles from './Credits.module.css';
import MenuStyles from '../Menu/Menu.module.css';
import { Link } from 'react-router-dom';
import Title from '../../Components/Title';

export default function Credits(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title />
        </Link>
        <p>
          Connect 420 - Retro Themed Online Muliplayer clone of connect 4 made by{' '}
          <a href="https://nick.wylynko.com">Nick Wylynko</a>
        </p>
        <p>
          Title font <a href="https://www.dafont.com/retronoid.font">Retronoid</a> from{' '}
          <a href="https://dafont.com">dafont.com</a> by{' '}
          <a href="https://www.dafont.com/darrell-flood.d4895">Darrell Flood</a>
        </p>
        <p>source code for this client:</p>
        <a href="https://github.com/nwylynko/connect420">https://github.com/nwylynko/connect420</a>
        <p>source code for the server:</p>
        <a href="https://github.com/nwylynko/connect420-server">https://github.com/nwylynko/connect420-server</a>
        <p>Technologies used: React, React Router, Socketio, Nodejs, TypeScript, Expressjs, Docker, Nginx, Redis</p>
        <Link className={MenuStyles.button} to="/">
          Go Back
        </Link>
      </div>
    </div>
  );
}
