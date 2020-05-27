import React, { useState, useContext, useEffect } from 'react';
import styles from './EndScreen.module.css';
import MenuStyles from '../../Menu/Menu.module.css';
import { Redirect } from 'react-router-dom';
import { StoreContext } from '../../../context';
import { socket } from '../Board';

let want = true;

export function EndScreen({ show, room }: { show: boolean; room: string }): JSX.Element {
  const [redirect, setRedirect] = useState<string>();
  const { connected } = useContext(StoreContext);
  const [player1WantsToReplay, setPlayer1WantsToReplay] = useState<string>('var(--text)');
  const [player2WantsToReplay, setPlayer2WantsToReplay] = useState<string>('var(--text)');

  useEffect((): (() => void) => {
    socket.on('replay', (msg: { player: string; replay: string }) => {
      console.log(msg);
      if (msg.player === 'player1') {
        setPlayer1WantsToReplay(msg.replay === 'true' ? 'var(--player1)' : 'var(--text)');
      } else if (msg.player === 'player2') {
        setPlayer2WantsToReplay(msg.replay === 'true' ? 'var(--player2)' : 'var(--text)');
      } else {
        throw new Error('player isnt player1 or player 2');
      }
    });

    return (): void => {
      socket.off('replay');
    };
  }, []);

  useEffect(() => {
    // reset, new room
    setRedirect(undefined);
    setPlayer1WantsToReplay('var(--text)');
    setPlayer2WantsToReplay('var(--text)');
    want = true;
  }, [room]);

  function replay(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    event.preventDefault();
    if (socket && connected) {
      socket.emit('replay', want);
      want = !want;
    }
  }

  if (!show) {
    return <></>;
  }

  return (
    <>
      {redirect ? <Redirect to={redirect} /> : null}
      <div className={styles.container}>
        {/* <button className={MenuStyles.button} style={{width: '100%'}} >continue (0/2)</button> */}
        <button className={MenuStyles.button} style={{ width: '100%' }} onClick={replay}>
          replay <Circle color={player1WantsToReplay} stroke={'var(--background)'} />
          <Circle color={player2WantsToReplay} stroke={'var(--background)'} />
        </button>
        <button className={MenuStyles.button} style={{ width: '100%' }} onMouseUp={(): void => setRedirect('/')}>
          back to Menu
        </button>
      </div>
    </>
  );
}

function Circle({
  color = 'red',
  stroke = 'black',
}: {
  color?: string | undefined;
  stroke?: string | undefined;
}): JSX.Element {
  return (
    <svg height="20" width="20" style={{ paddingRight: 2, paddingLeft: 2 }}>
      <circle cx="9" cy="11" r="9" fill={color} stroke={stroke} />
    </svg>
  );
}
