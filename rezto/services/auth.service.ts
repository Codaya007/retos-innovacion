import { User, UserRole } from '../types';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Mock simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '123',
          name: 'EcoFactory Ltd.',
          email,
          role: 'industry',
          token: 'abc-123-xyz'
        });
      }, 1000);
    });
  },

  register: async (name: string, email: string, password: string, role: UserRole): Promise<User> => {
    // Mock simulation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '456',
          name,
          email,
          role,
          token: 'def-456-uvw'
        });
      }, 1000);
    });
  }
};