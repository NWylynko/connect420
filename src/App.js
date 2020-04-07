import React, { useState, useEffect } from 'react';
import styles from './style.module.css'
import io from "socket.io-client";
import { MenuScreen } from './MenuScreen';

let socket;

let roomID = window.location.pathname.replace('/', '')

export default function App() {
  const [board, setBoard] = useState()
  const [status, setStatus] = useState("Welcome");
  const [connected, setConnected] = useState(false)
  const [info, setInfo] = useState({})

  useEffect(() => {
    console.log('render')
  })

  useEffect(() => {
    if (roomID) {
      // socket = io('https://potato.wylynko.com');
      socket = io('http://192.168.0.109:3002')
      socket.on("connect", () => { setConnected(true); setStatus("waiting for other player..."); socket.emit("room", roomID); console.log(socket.id) })
      socket.on("disconnect", () => { setConnected(false); setStatus("not connected to server...") })

      socket.on("status", setStatus);
      socket.on("board", setBoard);
      socket.on("info", setInfo);
      socket.on("setRoom", room => window.location.pathname = "/" + room)

    }

  }, [])

  useEffect(() => {
    console.log(connected ? "connected" : "disconnected")
  }, [connected])

  return (
    <div style={info.playerNum === 1 ? { '--playerColor': 'var(--red)' } : info.playerNum === 2 ? { '--playerColor': 'var(--yellow)' } : { '--playerColor': 'var(--blue)' }} >
      {roomID ? <><a href="/" style={{ textDecoration: 'none' }}><h2>Connect 420 - {roomID}</h2></a><h3>{status}</h3></> : <h1>Connect 420</h1>}
      {roomID ?
        board ? <GameBoard board={board} /> : <><p>Send this link to your friend for them to join: </p><p>https://connect420.web.app/{roomID}</p></> : <MenuScreen />
      }

    </div>
  );
}

function GameBoard({ board }) {
  return (
    <div className={styles.container} >

      {board.map(
        (col, x) => col.map(
          (row, y) => (
            <Item key={"board" + x + y} value={row} y={y} />
          )
        )
      )
      }

    </div>
  )
}

function Item({ value, y }) {
  if (value === 0) {
    return <div onClick={() => addCoin(y)} ><div className={styles.coin} /></div>
  } else if (value === 1) {
    return <div onClick={() => addCoin(y)} ><div className={[styles.coin, styles.red].join(" ")} /></div>
  } else if (value === 2) {
    return <div onClick={() => addCoin(y)} ><div className={[styles.coin, styles.yellow].join(" ")} /></div>
  } else {
    return null
  }
}

function addCoin(y) {
  socket.emit("addCoin", { y })
}