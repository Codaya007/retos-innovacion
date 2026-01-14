import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { AuthProvider, useAuth } from '../context/auth';

function RootLayoutNav() {
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!isAuthenticated && !inAuthGroup) {
      router.replace('/sign-in');
    } else if (isAuthenticated && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments, isLoading]);

  if (isLoading) return <Slot />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Definimos los GRUPOS principales, no las pantallas individuales */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(auth)" /> 
      
      {/* Pantallas sueltas (Modales) */}
      <Stack.Screen name="add-waste" options={{ presentation: 'modal', title: 'Nuevo Residuo' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
      <Toast />
    </AuthProvider>
  );
}