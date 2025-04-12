'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import useFormValidation from '@/hooks/useFormValidation';

interface FormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const { values, errors, touched, handleChange, handleBlur, validateForm } =
    useFormValidation<FormData>(formData, {
      email: [
        (value: string) => !value ? 'Email is required' : undefined,
        (value: string) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? 'Invalid email address'
          : undefined,
      ],
      password: [(value: string) => !value ? 'Password is required' : undefined],
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { values, errors });

    const isValid = validateForm();
    console.log('Form validation result:', isValid);

    if (isValid) {
      try {
        console.log('Attempting login with:', { email: values.email });
        await login(values.email, values.password);
        console.log('Login successful');
      } catch (error) {
        console.error('Login error:', error);
      }
    } else {
      console.log('Form validation failed:', errors);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            Admin Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={(e) => {
                console.log('Email changed:', e.target.value);
                handleChange('email')(e.target.value);
                setFormData(prev => ({ ...prev, email: e.target.value }));
              }}
              onBlur={handleBlur('email')}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={(e) => {
                console.log('Password changed');
                handleChange('password')(e.target.value);
                setFormData(prev => ({ ...prev, password: e.target.value }));
              }}
              onBlur={handleBlur('password')}
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              onClick={() => console.log('Sign in button clicked')}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
} 