import React, { useState, useEffect } from 'react';
import styles from './style.module.css'
import io from "socket.io-client";

let socket;

export default function App() {
  const [board, setBoard] = useState()
  const [status, setStatus] = useState("waiting for other player...");
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    console.log('render')
  })

  useEffect(() => {
    socket = io('potato.wylynko.com/connect420');
    socket.on("connect", () => { setConnected(true); setStatus("waiting for other player..."); joinRoom(); console.log(socket.id) })
    socket.on("disconnect", () => { setConnected(false); setStatus("not connected to server...") })

    socket.on("status", setStatus);
    socket.on("board", setBoard);

  }, [])

  function joinRoom() {
    socket.emit("room", window.location.hash.replace("#", ''))
    socket.on("room", room => window.location.hash = room)
  }

  useEffect(() => {
    console.log(connected ? "connected" : "disconnected")
  }, [connected])

  function addCoin(y) {
    socket.emit("addCoin", { y })
  }

  function Item({ value, y }) {
    if (value === 0) {
      return <div className={styles.empty} onClick={() => addCoin(y)} />
    } else if (value === 1) {
      return <div className={styles.red} onClick={() => addCoin(y)} />
    } else if (value === 2) {
      return <div className={styles.yellow} onClick={() => addCoin(y)} />
    } else {
      return null
    }
  }

  return (
    <>
      <h1 style={connected ? { color: 'green' } : { color: 'red' }}>Connect 420 - {status}</h1>
      {board ?
        <div className={styles.container}>

          {board.map(
            (col, x) => col.map(
              (row, y) => (
                <Item key={"board" + x + y} value={row} y={y} />
              )
            )
          )
          }

        </div> : <p>Loading...</p>
      }

    </>
  );
}



