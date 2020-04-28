import React, { useState, useEffect, useContext } from 'react';
import styles from './Board.module.css'
import io from "socket.io-client";
import statusDefs from '../../status';
import Header from '../../Components/Header/index'
import { useParams, Redirect } from "react-router-dom";
import { StoreContext } from '../../context';
import { server } from '../../config';
import Chat from './Chat/Chat'

let socket: SocketIOClient.Socket;

export default function App() {
  const [board, setBoard] = useState<number[][]>()
  const [highlights, setHighlights] = useState<number[][]>([[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]])
  const [status, setStatus] = useState<number>(10);
  const [redirect, setRedirect] = useState<string>()

  let { setInfo, name, connected, setConnected } = useContext(StoreContext);
  let { room } = useParams<{ room: string }>();

  useEffect(() => {
    if (room) {

      socket = io(server, { transports: ['websocket'] });

      socket.on("connect", () => { setConnected(true); setStatus(11); socket.emit("room", room); if (name) socket.emit("name", name); console.log(socket.id); })
      socket.on("disconnect", () => { setConnected(false); setStatus(12) })

      socket.on("status", setStatus);
      socket.on("board", setBoard);
      socket.on("info", setInfo);
      socket.on("setRoom", (room: string) => setRedirect("/" + room))
      socket.on("highlights", setHighlights)

    }

    return (() => {
      socket.disconnect();
    })

  }, [room, setInfo, name, setConnected])

  useEffect(() => {
    console.log(connected ? "connected" : "disconnected")
  }, [connected])

  return (
    <>
      {redirect ? <Redirect to={redirect} /> : null}
      {
        board ?
          <GameBoard board={board} status={status} room={room} highlights={highlights} /> :
          <Header subText={['Send this link to your friend for them to join:', `${server}/${room}`]} roomID={room} />
      }
      <Chat socket={socket} room={room} />
    </>
  );
}

function GameBoard({ board, status, room, highlights }: { board: number[][], status: number, room: string, highlights: number[][] }) {
  return (
    <>
      <Header subText={[statusDefs[status]]} roomID={room} />
      <div style={{ display: 'inline-flex', width: '100%', justifyContent: 'center', paddingBottom: 15, marginBottom: 15 }}>
        <div className={styles.container} >

          {
            board.map(
              (col, x) => col.map(
                (row, y) => (
                  <Item key={"board" + x + y} value={row} y={y} status={status} highlighted={highlights[x][y] === 1 ? true : false} />
                )
              )
            )
          }

        </div>
      </div>
    </>
  )
}

function Item({ value, y, status, highlighted }: { value: number, y: number, status: number, highlighted: boolean }) {
  if (value === 0) {
    return <div onClick={() => addCoin(y, status)} ><div className={styles.coin} /></div>
  } else if (value === 1) {
    return <div onClick={() => addCoin(y, status)} ><div className={[styles.coin, styles.red].join(" ")} style={highlighted ? { boxShadow: '0px 0px 2vmin 2vmin var(--player1)' } : {}} /></div>
  } else if (value === 2) {
    return <div onClick={() => addCoin(y, status)} ><div className={[styles.coin, styles.yellow].join(" ")} style={highlighted ? { boxShadow: '0px 0px 2vmin 2vmin var(--player2)' } : {}} /></div>
  } else {
    return null
  }
}

function addCoin(y: number, status: number) {
  if (status === 1) {
    socket.emit("addCoin", { y })
  }

}