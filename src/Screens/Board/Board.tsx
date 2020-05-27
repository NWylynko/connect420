import React, { useState, useEffect, useContext } from 'react';
import styles from './Board.module.css';
import statusDefs from '../../status';
import Header from '../../Components/Header/index';
import { useParams, Redirect } from 'react-router-dom';
import { StoreContext } from '../../context';
import Chat from './Chat/Chat';
import { EndScreen } from './EndScreen/EndScreen';
import { server } from '../../config';
import io from 'socket.io-client';

export let socket: SocketIOClient.Socket;

export default function App(): JSX.Element {
  const [board, setBoard] = useState<number[][]>();
  const [highlights, setHighlights] = useState<number[][]>([]);
  const [status, setStatus] = useState<number>(10);
  const [redirect, setRedirect] = useState<string>();

  const { connected, setConnected, name, setInfo } = useContext(StoreContext);
  const { room } = useParams<{ room: string }>();

  useEffect(() => {
    if (name && connected) socket.emit('name', name);
  }, [name, connected]);

  useEffect(() => {
    // reset because new room
    setBoard(undefined);
    setHighlights([]);
    setStatus(10);
    setRedirect(undefined);
  }, [room]);

  useEffect(() => {
    socket = io(server, { transports: ['websocket'] });

    socket.on('connect', () => {
      setConnected(true);
      console.log(socket.id);
    });
    socket.on('disconnect', () => {
      setConnected(false);
    });

    socket.on('info', setInfo);

    return (): void => {
      socket.disconnect();
    };
  }, [setConnected, setInfo]);

  useEffect(() => {
    if (room && socket) {
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
    }

    return (): void => {
      if (room && socket) {
        socket.off('status');
        socket.off('board');
        socket.off('setRoom');
        socket.off('highlights');
      }
    };
  }, [room, connected]);

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
      {board && status !== 11 ? (
        <GameBoard board={board} status={status} room={room} highlights={highlights} />
      ) : (
        <Header
          subText={['Send this link to your friend for them to join:', `${window.location.href}`]}
          roomID={room}
        />
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
          <EndScreen show={status === 6 || status === 7 || status === 8} room={room} />
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
