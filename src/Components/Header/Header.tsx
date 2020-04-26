import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { StoreContext } from '../../context';

export default function Header({ subText, roomID } : { subText: string[], roomID: string }) {
  
  const { connected } = useContext(StoreContext)

  return (
    <>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2>Connect 420 - {roomID}</h2>
      </Link>
      <p>{connected ? 'Connected :)' : 'Disconnected :('}</p>
      {subText.map((text, i) => <h3 key={i} >{text}</h3>)}
    </>
  )
}