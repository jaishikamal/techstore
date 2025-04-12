import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const checkAuth = useCallback(async () => {
    try {
      console.log('Checking authentication...');
      const response = await authApi.getCurrentUser();
      console.log('Auth check response:', response.data);
      setState({
        user: response.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Auth check error:', error);
      setState({
        user: null,
        loading: false,
        error: 'Not authenticated',
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      console.log('Starting login process...');
      setState((prev) => ({ ...prev, loading: true, error: null }));

      console.log('Sending login request...');
      const response = await authApi.login({ email, password });
      console.log('Login response:', response.data);

      console.log('Checking auth after login...');
      await checkAuth();

      console.log('Redirecting to dashboard...');
      router.push('/admin/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Login failed',
      }));
    }
  }, [checkAuth, router]);

  const logout = useCallback(async () => {
    try {
      console.log('Starting logout process...');
      setState((prev) => ({ ...prev, loading: true, error: null }));

      console.log('Sending logout request...');
      await authApi.logout();

      setState({
        user: null,
        loading: false,
        error: null,
      });

      console.log('Redirecting to login page...');
      router.push('/admin/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || 'Logout failed',
      }));
    }
  }, [router]);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    isAuthenticated: !!state.user,
  };
}

// Example usage:
// const { user, loading, error, login, logout, isAuthenticated } = useAuth();
//
// if (loading) return <LoadingSpinner />;
// if (error) return <ErrorMessage message={error} />;
//
// return isAuthenticated ? (
//   <div>
//     <p>Welcome, {user.email}</p>
//     <button onClick={logout}>Logout</button>
//   </div>
// ) : (
//   <LoginForm onSubmit={login} />
// ); 