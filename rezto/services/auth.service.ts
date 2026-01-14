import { User, UserRole } from '@/types';
import * as SecureStore from 'expo-secure-store';
import { apiClient } from './api';

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', { 
        email, 
        password 
      });

      const { user, token } = response.data;

      await SecureStore.setItemAsync('user_token', token);
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));

      return { ...user, token };
    } catch (error) {
      throw error;
    }
  },

  register: async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', { 
        name, 
        email, 
        password, 
        role 
      });

      const { user, token } = response.data;

      await SecureStore.setItemAsync('user_token', token);
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));

      return { ...user, token };
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // Eliminar datos de sesión para cerrar
      await SecureStore.deleteItemAsync('user_token');
      await SecureStore.deleteItemAsync('user_data');
    } catch (error) {
      console.error('Error durante logout', error);
    }
  }
};