import { WasteItem } from '@/types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function InventoryScreen() {
  const [items, setItems] = useState<WasteItem[]>([]);

  useEffect(() => {
    // inventoryService.getMyInventory().then(setItems);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.title}>My Waste Inventory</Text>
      <View style={styles.emptyState}>
        <Text>No items yet.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1B5E20', marginBottom: 20 },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});