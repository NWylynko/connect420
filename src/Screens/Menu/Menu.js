import React, { useState, useContext } from 'react';
import styles from './Menu.module.css'
import { Link } from "react-router-dom";
import { StoreContext } from '../../context';
import { version } from '../../../package.json'
import { server } from '../../config';
import useFetch from '../../hooks/useFetch'

export function MenuScreen() {
  const [room, setRoom] = useState("");

  const { theme, setTheme, name, setName } = useContext(StoreContext);

  const { loading, error, data } = useFetch(server + "/c420/version")

  function updateTheme() {

    setTheme(oldTheme => {
      let newTheme = oldTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem("theme", newTheme);
      window.setTheme()
      return newTheme;
    })

  }

  return (
    <div className={styles.container}>
      <h1>Connect 420</h1>
      <div className={styles.menu}>
        <input className={styles.button} value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Your Name" />
        <Link className={styles.button} to="/findingAGame" >Find a game</Link>
        <Link className={styles.button} to={"/" + generateRandomRoom()}>Create a private game</Link>
        <div style={{ display: 'inline-grid', gridTemplateColumns: '50% 50%' }}>
          <input className={styles.button} value={room} onChange={e => setRoom(e.target.value)} type="text" name="roomID" placeholder="Room" />
          <Link className={styles.button} to={"/" + room}>Join a private game</Link>
        </div>
        <LeaderBoard />
        <button className={styles.button} onClick={updateTheme}>Change to {theme === 'light' ? 'dark' : 'light'} mode</button>
        <Link className={styles.button} to="/credits" >Credits</Link>

        <p>Client: {version} {!loading && !error ? `|| Server: ${data.version}` : null}</p>
      </div>
    </div>
  );
}

function LeaderBoard() {

  const { loading, error, data } = useFetch(server + "/c420/leaderboard")

  return (
    <>
      <h2 style={{ marginTop: 15 }}>LeaderBoard</h2>
      {error ? 'error loading leaderboard :(' :
        loading ? 'Loading...' :
          <div style={{ display: 'inline-flex', justifyContent: 'center' }}>

            <table style={{ width: "50%", padding: 25, border: '3px solid var(--text)', borderRadius: '4vmin' }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              {data.map(({ id, name, score }) => <tbody key={id} ><tr><td>{name}</td><td>{score}</td></tr></tbody>)}
            </table>
          </div>
      }

    </>
  )
}

function generateRandomRoom() {
  return Math.random().toString(36).substr(2, 5);
}
