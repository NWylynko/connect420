export const server: string = window.env.REACT_APP_SERVER || process.env.REACT_APP_SERVER || 'http://localhost:3001';
export const api: string = window.env.REACT_APP_SERVER_API || process.env.REACT_APP_SERVER_API || '';
export const url: string = server + api;
