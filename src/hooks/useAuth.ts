import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useProductStore } from '@/store/productStore';

export const useAuth = () => {
  const navigate = useNavigate();
  const auth = useAuthStore();
  const { initializeUserData, clearUserData } = useProductStore();

  // Initialize user data when user logs in
  useEffect(() => {
    if (auth.currentUser) {
      initializeUserData(auth.currentUser.id);
      // Expose auth store to global window for product store access
      (window as any).authStore = auth;
    } else {
      clearUserData();
      // Clean up global reference
      (window as any).authStore = null;
    }
  }, [auth.currentUser, initializeUserData, clearUserData]);

  const logout = () => {
    auth.signOut();
    clearUserData();
    navigate('/login');
  };

  const requireAuth = () => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return false;
    }
    return true;
  };

  return {
    ...auth,
    logout,
    requireAuth
  };
};
