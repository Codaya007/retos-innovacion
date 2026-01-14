import { IndustrialRecipe } from '@/types';
import { apiClient } from './api';

export const matchService = {
  getSuggestions: async () => {
    try {
      const response = await apiClient.get<IndustrialRecipe[]>('/matches/suggestions');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  acceptMatch: async (matchId: string) => {
    try {
      const response = await apiClient.post(`/matches/${matchId}/accept`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};