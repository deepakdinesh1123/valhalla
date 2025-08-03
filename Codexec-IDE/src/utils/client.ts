import Tsvalkyrie from 'tsvalkyrie';
import { api } from './api'; 

const TOKEN_KEY = 'auth_token';
const EXPIRY_KEY = 'auth_token_expiry';

async function getApiKey(): Promise<string> {
  const storedToken = localStorage.getItem(TOKEN_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (storedToken && expiry && Date.now() < Number(expiry)) {
    return storedToken;
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRY_KEY);

  const response = await api.getValkyrieToken();
  const token = response.data.token;

  const ttl = (1 * 60 + 50) * 60 * 1000; // 1 hour 50 minutes
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRY_KEY, String(Date.now() + ttl));

  return token;
}


const apiKey = await getApiKey(); 

export const client = new Tsvalkyrie({
  apiKey,
  baseURL: import.meta.env.VITE_BASE_PATH,
  defaultHeaders: {
    'X-Auth-Token': import.meta.env.VITE_AUTH_TOKEN,
  },
});
