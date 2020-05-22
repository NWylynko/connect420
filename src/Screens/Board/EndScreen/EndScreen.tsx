import React, { useState, useContext, useEffect } from 'react';
import styles from './EndScreen.module.css';
import MenuStyles from '../../Menu/Menu.module.css';
import { Redirect } from 'react-router-dom';
import { StoreContext } from '../../../context';

export function EndScreen({ show, room } : { show: boolean, room: string }) {

  const [redirect, setRedirect] = useState<string>();
  const { socket, connected } = useContext(StoreContext);
  const [wantsToReplay, setWantsToReplay] = useState<boolean>(false);
  const [replayNum, setReplayNum] = useState<number>(0);

  useEffect(() => {
    socket.on("replay", (replay: string) => {
      console.log(replay)
      if (replay === "true") {
        setReplayNum(num => num + 1);
      } else {
        setReplayNum(num => num - 1);
      }
    });

    return(() => {
      socket.on("replay", (): void => {});
    })
  }, [socket])

  useEffect(() => {
    setWantsToReplay(false);
    setReplayNum(0);
  }, [room])

  function replay() {
    if (socket && connected) {
      setWantsToReplay((wantsToReplay: boolean) => {
        console.log(!wantsToReplay)
        socket.emit('replay', !wantsToReplay);
        return !wantsToReplay;
      })
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
        <button className={MenuStyles.button} style={{width: '100%'}} onMouseUp={() => { replay(); }}>replay {replayNum}/2</button>
        <button className={MenuStyles.button} style={{width: '100%'}} onMouseUp={() => setRedirect('/')}>back to Menu</button>
      </div>
      </>
    )
  }