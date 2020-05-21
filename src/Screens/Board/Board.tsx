import React, { useState, useEffect, useContext } from 'react';
import styles from './Board.module.css';
import statusDefs from '../../status';
import Header from '../../Components/Header/index';
import { useParams, Redirect } from 'react-router-dom';
import { StoreContext } from '../../context';
import Chat from './Chat/Chat';
import { EndScreen } from './EndScreen/EndScreen';
import { server } from '../../config';

export default function App(): JSX.Element {
  const [board, setBoard] = useState<number[][]>();
  const [highlights, setHighlights] = useState<number[][]>([]);
  const [status, setStatus] = useState<number>(10);
  const [redirect, setRedirect] = useState<string>();

  const { socket, connected } = useContext(StoreContext);
  const { room } = useParams<{ room: string }>();

  useEffect(() => {
    if (room && socket) {
      console.log('yas');

      if (connected) {
        setStatus(11);
        socket.emit('room', room);
      } else {
        setStatus(12);
      }

      socket.on('status', setStatus);
      socket.on('board', setBoard);
      socket.on('setRoom', (room: string) => setRedirect('/' + room));
      socket.on('highlights', setHighlights);
    } else {
      console.log('nah');
    }
  }, [room, socket, connected]);

  useEffect(() => {
    console.log(connected ? 'connected' : 'disconnected');
  }, [connected]);

  useEffect(() => {
    if (status === 6) {
      console.log('win');
    }
  }, [status]);

  useEffect(() => {
    console.log(status, statusDefs[status]);
  }, [status]);

  return (
    <>
      {redirect ? <Redirect to={redirect} /> : null}
      {board ? (
        <GameBoard board={board} status={status} room={room} highlights={highlights} />
      ) : (
        <Header subText={['Send this link to your friend for them to join:', `${server}/${room}`]} roomID={room} />
      )}
    </>
  );
}

function GameBoard({
  board,
  status,
  room,
  highlights,
}: {
  board: number[][];
  status: number;
  room: string;
  highlights: number[][];
}): JSX.Element {
  const { socket } = useContext(StoreContext);
  return (
    <>
      <Header subText={[statusDefs[status]]} roomID={room} />
      <div className={styles.container}>
        <div />
        <div className={styles.board}>
          {board.map((col, x) =>
            col.map((row, y) => (
              <Item
                key={'board' + x + y}
                value={row}
                y={y}
                status={status}
                highlighted={highlights.length ? (highlights[x][y] === 1 ? true : false) : false}
              />
            )),
          )}
          <EndScreen />
        </div>
        <Chat socket={socket} room={room} />
      </div>
    </>
  );
}

function Item({
  value,
  y,
  status,
  highlighted,
}: {
  value: number;
  y: number;
  status: number;
  highlighted: boolean;
}): JSX.Element | null {
  const { socket } = useContext(StoreContext);
  if (value === 0) {
    return (
      <div onClick={(): void => addCoin(socket, y, status)}>
        <div className={styles.coin} />
      </div>
    );
  } else if (value === 1) {
    return (
      <div onClick={(): void => addCoin(socket, y, status)}>
        <div
          className={[styles.coin, styles.red].join(' ')}
          style={highlighted ? { boxShadow: '0px 0px 2vmin 2vmin var(--player1)' } : {}}
        />
      </div>
    );
  } else if (value === 2) {
    return (
      <div onClick={(): void => addCoin(socket, y, status)}>
        <div
          className={[styles.coin, styles.yellow].join(' ')}
          style={highlighted ? { boxShadow: '0px 0px 2vmin 2vmin var(--player2)' } : {}}
        />
      </div>
    );
  } else {
    return null;
  }
}

function addCoin(socket: SocketIOClient.Socket, y: number, status: number): void {
  if (status === 1) {
    socket.emit('addCoin', { y });
  }
}
