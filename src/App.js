import React, { useState, useEffect } from 'react';
import styles from './style.module.css'
import io from "socket.io-client";
import { MenuScreen } from './MenuScreen';
import statusDefs from './status'

let socket;

let roomID = window.location.pathname.replace('/', '')

export default function App() {
  const [board, setBoard] = useState()
  const [status, setStatus] = useState(10);
  const [connected, setConnected] = useState(false)
  const [info, setInfo] = useState({})
  const [theme, setTheme] = useState(getTheme())

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

      socket.on("connect", () => { setConnected(true); setStatus(11); socket.emit("room", roomID); console.log(socket.id) })
      socket.on("disconnect", () => { setConnected(false); setStatus(12) })

      socket.on("status", setStatus);
      socket.on("board", setBoard);
      socket.on("info", setInfo);
      socket.on("setRoom", room => window.location.pathname = "/" + room)

    }

  }, [])

  useEffect(() => {
    console.log(connected ? "connected" : "disconnected")
  }, [connected])

  useEffect(() => {
    if (board) {
      window.onbeforeunload = function () {
        return "If you leave you cant keep playing on this board!";
      };
    }
  }, [board])

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
      {roomID ?
        board ? <GameBoard board={board} status={status} /> : <Header subText={['Send this link to your friend for them to join:', `https://connect420.web.app/${roomID}`]} roomID={roomID} /> : <MenuScreen theme={theme} setTheme={setTheme} />
      }

    </div>
  );
}

function Header({ subText, roomID }) {
  return (
    <>
      <a href="/" style={{ textDecoration: 'none' }}>
        <h2>Connect 420 - {roomID}</h2>
      </a>
      {subText.map((text, i) => <h3 key={i} >{text}</h3>)}
    </>
  )
}

function GameBoard({ board, status }) {
  return (
    <>
    <Header subText={[statusDefs[status]]} roomID={roomID} />
    <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', paddingBottom: 15, marginBottom: 15 }}>
      <div className={styles.container} >

        {board.map(
          (col, x) => col.map(
            (row, y) => (
              <Item key={"board" + x + y} value={row} y={y} status={status} />
            )
          )
        )
        }

      </div>
    </div>
    </>
  )
}

function Item({ value, y, status }) {
  if (value === 0) {
    return <div onClick={() => addCoin(y, status)} ><div className={styles.coin} /></div>
  } else if (value === 1) {
    return <div onClick={() => addCoin(y, status)} ><div className={[styles.coin, styles.red].join(" ")} /></div>
  } else if (value === 2) {
    return <div onClick={() => addCoin(y, status)} ><div className={[styles.coin, styles.yellow].join(" ")} /></div>
  } else {
    return null
  }
}

function addCoin(y, status) {
  if (status === 1) {
    socket.emit("addCoin", { y })
  }
  
}

function getTheme() {

  let preference = localStorage.getItem("theme")

  if (preference !== null) {
    return preference
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}