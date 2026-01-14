import axios from 'axios';

// TODO: Esto cambia segun la ip de la PC donde corre el backend
const API_URL = 'http://192.168.101.4:3000'; 

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});