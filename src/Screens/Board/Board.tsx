import React, { useState, useEffect, useContext } from 'react';
import styles from './Board.module.css'
import io from "socket.io-client";
import statusDefs from '../../status';
import Header from '../../Components/Header/index'
import { useParams, Redirect } from "react-router-dom";
import { StoreContext } from '../../context';
import { server } from '../../config';

let socket: SocketIOClient.Socket;

export default function App() {
  const [board, setBoard] = useState<number[][]>()
  const [status, setStatus] = useState<number>(10);
  const [connected, setConnected] = useState<boolean>(false)
  const [redirect, setRedirect] = useState<string>()

  let { setInfo, name } = useContext(StoreContext);
  let { room } = useParams<{ room: string}>();

  useEffect(() => {
    if (room) {

      if (process.env.NODE_ENV === 'development') {
        socket = io('http://192.168.0.109:3001', { transports: ['websocket'] })
      } else {
        socket = io(server, { transports: ['websocket'] });
      }

      socket.on("connect", () => { setConnected(true); setStatus(11); socket.emit("room", room); if (name) socket.emit("name", name); console.log(socket.id) })
      socket.on("disconnect", () => { setConnected(false); setStatus(12) })

      socket.on("status", setStatus);
      socket.on("board", setBoard);
      socket.on("info", setInfo);
      socket.on("setRoom", (room: string) => setRedirect("/" + room))

    }

    return (() => {
      socket.disconnect();
    })

  }, [room, setInfo, name])

  useEffect(() => {
    console.log(connected ? "connected" : "disconnected")
  }, [connected])

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

function GameBoard({ board, status, room } : { board: number[][], status: number, room: string}) {
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

function Item({ value, y, status } : {value : number, y: number, status: number}) {
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

function addCoin(y: number, status: number) {
  if (status === 1) {
    socket.emit("addCoin", { y })
  }
  
}