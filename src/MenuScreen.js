import React, { useState } from 'react';
import styles from './MenuScreen.module.css'

export function MenuScreen({ theme, setTheme }) {
  const [room, setRoom] = useState("");

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
        <button className={styles.button} onClick={joinLobby}>Find a game</button>
        <button className={styles.button} onClick={newRoom}>Create a private game</button>
        <input className={styles.button} value={room} onChange={e => setRoom(e.target.value)} type="text" name="roomID" placeholder="Room" />
        <button className={styles.button} onClick={() => { joinRoom(room); }}>Join a private game</button>
        <button className={styles.button} onClick={updateTheme}>Change to {theme === 'light' ? 'dark' : 'light'} mode</button>
      </div>
    </div>
  );
}

function joinLobby() {
  window.location.pathname = "/findingAGame"
}

function joinRoom(room) {
  if (room) {
    window.location.pathname = "/" + room
  }
}

function newRoom() {
  let room = Math.random().toString(36).substr(2, 5);
  window.location.pathname = "/" + room
}
