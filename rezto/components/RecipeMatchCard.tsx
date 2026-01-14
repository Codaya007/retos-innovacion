import { IndustrialRecipe } from '@/types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  recipe: IndustrialRecipe;
  onPress: () => void;
}

export const RecipeMatchCard: React.FC<Props> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.matchTitle}>Rezto Match</Text>
        <Text style={styles.distance}>{recipe.distance}</Text>
      </View>
      
      <View style={styles.equationContainer}>
        <View style={styles.ingredientBox}>
          <Text style={styles.ingredientLabel}>Tienes</Text>
          <Text style={styles.ingredientText}>{recipe.ingredientA.type}</Text>
        </View>

        <Text style={styles.plusSign}>+</Text>

        <View style={styles.ingredientBox}>
          <Text style={styles.ingredientLabel}>Tienen </Text>
          <Text style={styles.ingredientText}>{recipe.ingredientB.type}</Text>
        </View>
      </View>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}>Producto potencial:</Text>
        <Text style={styles.productName}>{recipe.productName}</Text>
      </View>
      
      <Text style={styles.companyInfo}>Ofertado por: {recipe.companyB}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  matchTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2E7D32',
    textTransform: 'uppercase',
  },
  distance: {
    fontSize: 12,
    color: '#757575',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  equationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  ingredientBox: {
    flex: 1,
    alignItems: 'center',
  },
  ingredientLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    marginBottom: 4,
  },
  ingredientText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    textAlign: 'center',
  },
  plusSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginHorizontal: 8,
  },
  resultContainer: {
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  resultLabel: {
    fontSize: 12,
    color: '#2E7D32',
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    textAlign: 'center',
  },
  companyInfo: {
    marginTop: 12,
    fontSize: 12,
    fontStyle: 'italic',
    color: '#616161',
    textAlign: 'right',
  }
});