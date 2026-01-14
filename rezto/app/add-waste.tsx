import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';

const UNITS = ["kg", "lb", "ton", "gr", "oz", "piezas", "Unidades"]

export default function AddWasteScreen() {
  const router = useRouter();
  const [materialType, setMaterialType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');

  const handlePublish = () => {
    if (!materialType || !quantity) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor llena todos los campos'
      });
      return;
    }
    
    console.log({ materialType, quantity, unit });
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>New Waste Entry</Text>
      <Text style={styles.subTitle}>Upload your industrial by-products</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Material Name</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Denim Scraps" 
          value={materialType}
          onChangeText={setMaterialType}
          placeholderTextColor="#9E9E9E"
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.formGroup, { flex: 2, marginRight: 10 }]}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput 
            style={styles.input} 
            placeholder="500" 
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            placeholderTextColor="#9E9E9E"
          />
        </View>

        <View style={[styles.formGroup, { flex: 1 }]}>
          <Text style={styles.label}>Unit</Text>
          <View style={styles.unitContainer}>
            <Text style={styles.unitText}>{unit}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.uploadBox}>
        <Text style={styles.uploadText}>+ Upload Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>Publish to Marketplace</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#FAFAFA',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 32,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#212121',
  },
  row: {
    flexDirection: 'row',
  },
  unitContainer: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#616161',
  },
  uploadBox: {
    height: 120,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  uploadText: {
    color: '#2E7D32',
    fontWeight: '600',
    fontSize: 16,
  },
  publishButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  }
});