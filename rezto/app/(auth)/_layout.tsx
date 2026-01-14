import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" options={{ title: 'Login' }} />
      <Stack.Screen name="sign-up" options={{ title: 'Registro' }} />
    </Stack>
  );
}