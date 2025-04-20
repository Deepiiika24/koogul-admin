import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { postData } from 'src/webService/webService';
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const username = localStorage.getItem('username');

  const handleClick = async () => {
    debugger
    setLoading(true);
    setError('');
    const loginData = { email, password };

    try {
      const response = await postData('admin/login', loginData);

      // Save the JWT token in localStorage (or a secure place)
      localStorage.setItem('token', response.token);
      localStorage.setItem('username', response.username);
      localStorage.setItem('email', response.email);
      localStorage.setItem('role', response.role);
      toast.success(`Welcome! ${response.username}`);

      // Navigate to the dashboard if login is successful
      navigate('/dashboard/app', { replace: true });
    } catch (err) {
      setError('Login failed! Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        KOOGUL INDUSTRIES
      </Typography>

      <Typography variant="subtitle1" align="center" color="textSecondary" sx={{ mb: 2 }}>
        Welcome! Please log-in to continue.
      </Typography>
      {error && <Typography color="error" align="center">{error}</Typography>}
      <Stack spacing={3}>
        <TextField name="email" label="Email address" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField
          size="small"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 2 }} onClick={handleClick} loading={loading}>
        Login
      </LoadingButton>
    </>
  );
}
