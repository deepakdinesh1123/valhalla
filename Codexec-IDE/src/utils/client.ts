import Tsvalkyrie from 'tsvalkyrie';

export const client = new Tsvalkyrie({
  apiKey: import.meta.env.VITE_AUTH_TOKEN,
  baseURL: import.meta.env.VITE_BASE_PATH,
  // defaultHeaders: {
  //   'X-Auth-Token': import.meta.env.VITE_AUTH_TOKEN,
  // }
});
