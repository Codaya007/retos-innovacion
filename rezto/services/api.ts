import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// TODO: Esto cambia segun la ip de la PC donde corre el backend
const API_URL = 'http://192.168.101.4:8000'; 

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error leyendo token", error);
  }
  return config;
});