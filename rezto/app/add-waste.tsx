import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener esto instalado
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

const UNITS = [
  "kg", "ton", "lb", "g", "oz",       // Peso
  "L", "gal", "ml",                   // Volumen
  "m", "m²", "m³",                    // Dimensiones
  "piezas", "unidades", "cajas", "pallets" // Conteo
];

export default function AddWasteScreen() {
  const router = useRouter();
  const [materialType, setMaterialType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [modalVisible, setModalVisible] = useState(false);

  const handlePublish = () => {
    if (!materialType || !quantity) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Por favor completa todos los campos'
      });
      return;
    }
    
    // console.log({ materialType, quantity, unit });
    
    Toast.show({
      type: 'success',
      text1: 'Éxito',
      text2: 'Residuo publicado correctamente'
    });
    
    router.back();
  };

  const renderUnitItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.modalItem} 
      onPress={() => {
        setUnit(item);
        setModalVisible(false);
      }}
    >
      <Text style={[styles.modalItemText, item === unit && styles.selectedItemText]}>
        {item}
      </Text>
      {item === unit && <Ionicons name="checkmark" size={20} color="#2E7D32" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>Nuevo Residuo</Text>
        <Text style={styles.subTitle}>Publica tus subproductos industriales</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del Material</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej: Recortes de Mezclilla" 
            value={materialType}
            onChangeText={setMaterialType}
            placeholderTextColor="#9E9E9E"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 2, marginRight: 10 }]}>
            <Text style={styles.label}>Cantidad</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Ej: 500" 
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
              placeholderTextColor="#9E9E9E"
            />
          </View>

          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Unidad</Text>
            {/* Ahora esto es un botón que abre el modal */}
            <TouchableOpacity 
              style={styles.unitSelector} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.unitText}>{unit}</Text>
              <Ionicons name="chevron-down" size={16} color="#616161" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.uploadBox}>
          <Ionicons name="camera-outline" size={32} color="#2E7D32" />
          <Text style={styles.uploadText}>Subir Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
          <Text style={styles.publishButtonText}>Publicar en Mercado</Text>
        </TouchableOpacity>

        {/* Modal para selección de unidades */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Seleccionar Unidad</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              
              <FlatList
                data={UNITS}
                keyExtractor={(item) => item}
                renderItem={renderUnitItem}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
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
  unitSelector: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
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
    gap: 10
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
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121'
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  modalItemText: {
    fontSize: 16,
    color: '#424242'
  },
  selectedItemText: {
    color: '#2E7D32',
    fontWeight: 'bold'
  }
});