import React from 'react';
import styles from './Credits.module.css'
import MenuStyles from '../Menu/Menu.module.css'
import { Link } from "react-router-dom";

export default function Credits() {
  return (

    <div className={styles.container}>
      <Link to="/" style={{ textDecoration: 'none'}}><h1>Connect 420</h1></Link>
      <div className={styles.body}>
        <p>Game made by <a href="https://nick.wylynko.com">Nick Wylynko</a></p>
        <p>Title font <a href="https://www.dafont.com/retronoid.font">Retronoid</a> from <a href="https://dafont.com">dafont.com</a> by <a href="https://www.dafont.com/darrell-flood.d4895">Darrell Flood</a></p>
        <p>source code for this client:</p><a href="https://github.com/nwylynko/connect420">https://github.com/nwylynko/connect420</a>
        <p>source code for the server:</p><a href="https://github.com/nwylynko/connect420-server">https://github.com/nwylynko/connect420-server</a>
        <p>Technologies used: React, React Router, Socketio, Nodejs, Expressjs, Pm2, Nginx, Redis</p>
        <Link className={MenuStyles.button} to="/" >Go Back</Link>
      </div>
    </div>
  )
}