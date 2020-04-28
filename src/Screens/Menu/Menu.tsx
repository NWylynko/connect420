import React, { useState, useContext } from 'react';
import styles from './Menu.module.css'
import { Link } from "react-router-dom";
import { StoreContext } from '../../context';
import { version } from '../../../package.json'
import { url } from '../../config';
import useFetch from '../../hooks/useFetch';
import Title from '../../Components/Title';
import { LeaderBoard } from './LeaderBoard/LeaderBoard';

export function MenuScreen() {
  const [room, setRoom] = useState("");

  const { theme, setTheme, name, setName } = useContext(StoreContext);

  const { loading, error, data } = useFetch(url + "/version")

  function updateTheme() {

    setTheme(oldTheme => {
      let newTheme = oldTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem("theme", newTheme);
      // window.setTheme()
      return newTheme;
    })

  }

  return (
    <div className={styles.container}>
      <div className={styles.page}>
        <div style={{ width: '20vw' }}/>
        <div className={styles.menu}>
          <Title />

          <input className={styles.button} value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Your Name" maxLength={16} />
          <Link className={styles.button} to="/findingAGame" >Find a match</Link>
          <Link className={styles.button} to={"/" + generateRandomRoom()}>Create a private room</Link>
          <div style={{ display: 'inline-grid', gridTemplateColumns: '50% 50%' }}>
            <input className={styles.button} value={room} onChange={e => setRoom(e.target.value)} type="text" name="roomID" placeholder="Room" maxLength={12} />
            <Link className={styles.button} to={"/" + room}>Join private room</Link>
          </div>
          <button className={styles.button} onClick={updateTheme}>Change to {theme === 'light' ? 'dark mode 🌙' : 'light mode 🌞'}</button>
          <Link className={styles.button} to="/credits" >Credits</Link>

          <p>
            Client: 
              {` ${version}`} 
              {process.env.NODE_ENV === 'development' && ' development'} 
              {!loading && !error ? ` || Server: ${data.version}` : null} 
              {!loading && !error && process.env.NODE_ENV === 'development' ? ' development ' : null} 
          </p> 
        </div>
        <LeaderBoard />
      </div>
    </div>
  );
}

function generateRandomRoom() {
  return Math.random().toString(36).substr(2, 5);
}
