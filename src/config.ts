export let server: string;
export let api: string;

if (process.env.NODE_ENV === 'development') {
  server = "http://192.168.0.109:3001";
  api = "";
} else {
  server = "https://potato.wylynko.com";
  api = "/c420";
}

export const url: string = server + api;