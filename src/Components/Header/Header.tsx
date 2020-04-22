import React from 'react';
import { Link } from "react-router-dom";

export default function Header({ subText, roomID } : { subText: string[], roomID: string }) {
  return (
    <>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h2>Connect 420 - {roomID}</h2>
      </Link>
      {subText.map((text, i) => <h3 key={i} >{text}</h3>)}
    </>
  )
}