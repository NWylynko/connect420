import React, { useState, useEffect, useContext } from 'react';
import { StoreContext } from '../../../context';
// import styles from './Chat.module.css'
import HowLongAgo from '@nwylynko/how-long-ago'

interface message {
  message: string;
  timestamp: number;
  from: "player1" | "player2" | "viewer";
}

export default function Chat({ socket, room }: { socket: SocketIOClient.Socket, room: string }) {
  const [message, setMessage] = useState<string>("") // stores the message the user is typing
  const [messages, setMessages] = useState<message[]>([]) // an arary of all messages sent and recieved
  let { connected } = useContext(StoreContext);
  useEffect(() => {
    if (room && socket) {

      socket.on("message", ({ message, timestamp, from } : message) => {
        setMessages((oldState) => oldState.concat({ message, timestamp, from }))
      })

    }

  }, [room, socket])

  if (room === 'findingAGame') {
    return null
  } 

  if (!connected) {
    return <p>Connecting to Chat</p>
  }

  return (
    <div>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={() => { socket.emit("message", { message, timestamp: Date.now() }); setMessage("") }}>Send</button>
      <div>
        {messages.map(({ message, timestamp, from }) => <p key={timestamp}>{HowLongAgo(timestamp) + ' : ' + from + ' : ' + message}</p>)}
      </div>
    </div>
  );
}
