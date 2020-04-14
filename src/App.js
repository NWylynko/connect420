import React, { useState, useEffect } from 'react';
import styles from './style.module.css'
import io from "socket.io-client";
import { MenuScreen } from './MenuScreen';
import statusDefs from './status'

let socket;

let roomID = window.location.pathname.replace('/', '')

export default function App() {
  const [board, setBoard] = useState()
  const [status, setStatus] = useState("Welcome");
  const [connected, setConnected] = useState(false)
  const [info, setInfo] = useState({})
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    setTheme(getTheme())
  }, [])

  useEffect(() => {
    console.log(theme)
  }, [theme])

  useEffect(() => {
    console.log('render')
  })

  useEffect(() => {
    if (roomID) {
      
      if (process.env.NODE_ENV === 'development') {
        socket = io('http://192.168.0.109:3001', { transports: ['websocket'] })
      } else {
        socket = io('https://potato.wylynko.com', { transports: ['websocket'] });
      }

      socket.on("connect", () => { setConnected(true); setStatus("waiting for other player..."); socket.emit("room", roomID); console.log(socket.id) })
      socket.on("disconnect", () => { setConnected(false); setStatus("not connected to server...") })

      socket.on("status", n => setStatus(statusDefs[n]));
      socket.on("board", setBoard);
      socket.on("info", setInfo);
      socket.on("setRoom", room => window.location.pathname = "/" + room)

    }

  }, [])

  useEffect(() => {
    console.log(connected ? "connected" : "disconnected")
  }, [connected])

  function colors() {

    let themes = {
      light: {
        '--text': '#3d3d3d',
        '--background': '#f2f3f5',
      },
      dark: {
        '--text': '#E8E9EB',
        '--background': '#121113',
      },
    }

    let style = themes[theme]

    if (info.type) style['--playerColor'] = `var(--${info.type})` // info.type either player1, player2, viewer or undefined (shouldnt be an issues, will only be undefined at menu screen)

    return style

  }

  return (
    <div className="app" style={colors()} >
      {roomID ? <><a href="/" style={{ textDecoration: 'none' }}><h2>Connect 420 - {roomID}</h2></a><h3>{status}</h3></> : <h1>Connect 420</h1>}
      {roomID ?
        board ? <GameBoard board={board} /> : <><p>Send this link to your friend for them to join: </p><p>https://connect420.web.app/{roomID}</p></> : <MenuScreen theme={theme} setTheme={setTheme} />
      }

    </div>
  );
}

function GameBoard({ board }) {
  return (
    <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', paddingBottom: 15, marginBottom: 15 }}>
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

function getTheme() {

  let preference = localStorage.getItem("theme")

  if (preference !== null) {
    return preference
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}