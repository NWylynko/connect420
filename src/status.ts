// instead of sending the message over the socket every time it need to
// be updated, just send the number and let the client store the message
// this makes it easier to add other languages in the future

const status: string[] = [
  'error',
  'Its Your Turn!',
  'Other Players Turn!',
  'Game is full, your a viewer',
  'Great Play!',
  'Games a Draw',
  'You Win!!',
  'You Lost :(',
  'Other Player Left, You Win!!',
  'Looking for a match!',
  'Connecting...',
  'waiting for other player...',
  'not connected to server...',
];

export default status;
