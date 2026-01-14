import { apiClient } from '@/api';
import { WasteItem } from '../types';

export const inventoryService = {
  createWaste: async (data: Omit<WasteItem, 'id'>) => {
    try {
      const response = await apiClient.post('/waste', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getMyInventory: async () => {
    try {
      const response = await apiClient.get<WasteItem[]>('/waste/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};