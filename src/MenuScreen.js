import React, { useState } from 'react';
import styles from './MenuScreen.module.css'

export function MenuScreen() {
  const [room, setRoom] = useState("");
  return (
  <div className={styles.container}>
    <button className={styles.button} onClick={joinLobby}>Find a game</button>
    <button className={styles.button} onClick={newRoom}>Create a private game</button>
    <input className={styles.button} value={room} onChange={e => setRoom(e.target.value)} type="text" name="roomID" placeholder="room" />
    <button className={styles.button} onClick={() => { joinRoom(room); }}>Join a private game</button>
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
