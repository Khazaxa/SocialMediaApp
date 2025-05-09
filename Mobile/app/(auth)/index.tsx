import { Redirect } from 'expo-router';
import { useAuthStore } from '@/store/authStore';

export default function AuthIndex() {
  const { isAuthenticated } = useAuthStore();
  
  return isAuthenticated ? <Redirect href="/(tabs)" /> : <Redirect href="/login" />;
}