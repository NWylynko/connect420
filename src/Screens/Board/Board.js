import React, { useState, useEffect, useContext } from 'react';
import styles from './Board.module.css'
import io from "socket.io-client";
import statusDefs from '../../status';
import Header from '../../Components/Header'
import { useParams, Redirect } from "react-router-dom";
import { StoreContext } from '../../context';
import { server } from '../../config';

let socket;

export default function App() {
  const [board, setBoard] = useState()
  const [status, setStatus] = useState(10);
  const [connected, setConnected] = useState(false)
  const [redirect, setRedirect] = useState()

  let { setInfo } = useContext(StoreContext);
  let { room } = useParams();

  useEffect(() => {
    if (room) {

      if (process.env.NODE_ENV === 'development') {
        socket = io('http://localhost:3001', { transports: ['websocket'] })
      } else {
        socket = io(server, { transports: ['websocket'] });
      }

      socket.on("connect", () => { setConnected(true); setStatus(11); socket.emit("room", room); console.log(socket.id) })
      socket.on("disconnect", () => { setConnected(false); setStatus(12) })

      socket.on("status", setStatus);
      socket.on("board", setBoard);
      socket.on("info", setInfo);
      socket.on("setRoom", room => setRedirect("/" + room))

    }

    return (() => {
      socket.disconnect();
    })

  }, [room, setInfo])

  useEffect(() => {
    console.log(connected ? "connected" : "disconnected")
  }, [connected])

  useEffect(() => {
    if (board) {
      window.onbeforeunload = function () {
        return "If you leave you cant keep playing on this board!";
      };
    }

    return(() => {
      window.onbeforeunload = null;
    })
  }, [board])

  return (
    <>
    {redirect ? <Redirect to={redirect} /> : null}
      {
        board ? 
          <GameBoard board={board} status={status} room={room} /> : 
          <Header subText={['Send this link to your friend for them to join:', `https://connect420.web.app/${room}`]} roomID={room} />
      }

    </>
  );
}

function GameBoard({ board, status, room }) {
  return (
    <>
    <Header subText={[statusDefs[status]]} roomID={room} />
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