import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/context/auth';
import { authService } from '@/services/auth.service';
import { UserRole } from '@/types';
import Toast from 'react-native-toast-message';

export default function SignUpScreen() {
  const { signIn } = useAuth();
  const [role, setRole] = useState<UserRole>('industry');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const user = await authService.register(name, email, password, role);
      console.log(user)
      signIn(user);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'No se ha podido crear la cuenta'
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        
        <View style={styles.roleContainer}>
          <TouchableOpacity 
            style={[styles.roleButton, role === 'industry' && styles.roleButtonActive]}
            onPress={() => setRole('industry')}
          >
            <Text style={[styles.roleText, role === 'industry' && styles.roleTextActive]}>Industry</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.roleButton, role === 'individual' && styles.roleButtonActive]}
            onPress={() => setRole('individual')}
          >
            <Text style={[styles.roleText, role === 'individual' && styles.roleTextActive]}>Individual</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder={role === 'industry' ? "Company Name" : "Full Name"}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrarse como {role === 'industry' ? 'Industria' : 'Individual'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1B5E20', marginBottom: 24 },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  roleButton: { flex: 1, padding: 12, borderRadius: 10, alignItems: 'center' },
  roleButtonActive: { backgroundColor: '#fff', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  roleText: { fontWeight: '600', color: '#757575' },
  roleTextActive: { color: '#2E7D32' },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});