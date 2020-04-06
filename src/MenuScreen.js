import React, { useState } from 'react';

export function MenuScreen() {
  const [room, setRoom] = useState("");
  return (
  <>
    <button style={buttonStyle} onClick={newRoom}>Create a new game</button>
    <input style={buttonStyle} value={room} onChange={e => setRoom(e.target.value)} type="text" name="roomID" placeholder="room" />
    <button style={buttonStyle} onClick={() => { joinRoom(room); }}>Join a game</button>
  </>
  );
}

function joinRoom(room) {
  if (room) {
    window.location.pathname = "/" + room
  }
}

function newRoom() {
  let room = Math.random().toString(36).substr(2, 5);
  window.location.pathname = "/" + room
}

const buttonStyle = {
  padding: 10,
  margin: 10,
  borderRadius: 5,
  backgroundColor: 'white',
}
