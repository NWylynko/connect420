import React, { useState, useContext, useEffect } from 'react';
import styles from './Menu.module.css'
import { Link } from "react-router-dom";
import { StoreContext } from '../../context';
import { version } from '../../../package.json'
import { server } from '../../config';
import useFetch from '../../hooks/useFetch'

export function MenuScreen() {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");

  const { theme, setTheme } = useContext(StoreContext);

  const { loading, error, data } = useFetch(server + "/version")

  function updateTheme() {

    setTheme(oldTheme => {
      let newTheme = oldTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem("theme", newTheme);
      window.setTheme()
      return newTheme;
    })

  }

  useEffect(() => {
    fetch(server+"/version").then()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Connect 420</h1>
      <div className={styles.menu}>
        {/* <input className={styles.button} value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Your Name" /> */}
        <Link className={styles.button} to="/findingAGame" >Find a game</Link>
        <Link className={styles.button} to={"/" + generateRandomRoom()}>Create a private game</Link>
        <div style={{ display: 'inline-grid', gridTemplateColumns: '50% 50%' }}>
          <input className={styles.button} value={room} onChange={e => setRoom(e.target.value)} type="text" name="roomID" placeholder="Room" />
          <Link className={styles.button} to={"/" + room}>Join a private game</Link>
        </div>
        <button className={styles.button} onClick={updateTheme}>Change to {theme === 'light' ? 'dark' : 'light'} mode</button>
        <Link className={styles.button} to="/credits" >Credits</Link>
        <p>Client: {version} {!loading && !error ? `|| Server: ${data}` : null}</p>
      </div>
    </div>
  );
}

function generateRandomRoom() {
  return Math.random().toString(36).substr(2, 5);
}
