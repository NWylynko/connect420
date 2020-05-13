import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../../context';
import styles from './Chat.module.css';
import MenuStyles from '../../Menu/Menu.module.css';
import HowLongAgo from '@nwylynko/how-long-ago';

interface Message {
  message: string;
  timestamp: number;
  from: 'player1' | 'player2' | 'viewer';
}

export default function Chat({ socket, room }: { socket: SocketIOClient.Socket; room: string }): JSX.Element | null {
  const [message, setMessage] = useState<string>(''); // stores the message the user is typing
  const [messages, setMessages] = useState<Message[]>([]); // an arary of all messages sent and recieved
  const { connected } = useContext(StoreContext);
  useEffect(() => {
    if (room && socket) {
      socket.on('message', ({ message, timestamp, from }: Message) => {
        setMessages((oldState) => [{ message, timestamp, from }].concat(oldState));
      });
    }
  }, [room, socket]);

  function handleEnterKey(target: React.KeyboardEvent<HTMLInputElement>): void {
    if (target.charCode === 13) {
      sendMessage();
    }
  }

  function sendMessage(): void {
    if (message) {
      socket.emit('message', { message, timestamp: Date.now() });
      setMessage('');
    }
  }

  if (room === 'findingAGame') {
    return null;
  }

  if (!connected) {
    return <p>Connecting to Chat</p>;
  }

  return (
    <div>
      <div className={styles.grid}>
        <input
          onKeyPress={handleEnterKey}
          placeholder="Message..."
          className={MenuStyles.button}
          type="text"
          maxLength={128}
          value={message}
          onChange={(e): void => setMessage(e.target.value)}
        />
        <button className={MenuStyles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
      <div className={styles.messages}>{messages.map(Message)}</div>
    </div>
  );
}

function Message({ message, timestamp, from }: Message): JSX.Element {
  return (
    <div className={[styles.message_container, styles[from]].join(' ')} key={timestamp}>
      <p className={styles.message}>{message}</p>
      <p className={styles.message}>{HowLongAgo(timestamp)}</p>
    </div>
  );
}
