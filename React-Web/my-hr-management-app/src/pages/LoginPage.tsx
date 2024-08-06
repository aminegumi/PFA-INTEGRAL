import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container,
  Grid,
  Snackbar,
  Alert,
  Link
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'linear-gradient(135deg, rgba(255, 248, 243, 0.9) 0%, rgba(117, 134, 148, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      console.log('Request payload:', { email, password });
      const response = await api.post('/api/login/', { email, password });
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      setSuccess('Login successful');
      navigate('/');
    } catch (err) {
      if (err.response) {
        setError(err.response.data.non_field_errors || 'Invalid email or password');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleCreateAccount = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate('/register');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StyledPaper elevation={6}>
          <Typography component="h1" variant="h5" sx={{ color: '#405D72', marginBottom: 2 }}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#405D72',
                  },
                  '&:hover fieldset': {
                    borderColor: '#758694',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#405D72',
                },
              }}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#405D72',
                  },
                  '&:hover fieldset': {
                    borderColor: '#758694',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#405D72',
                },
              }}
            />
            <Grid container spacing={2} sx={{ mt: 3, mb: 2 }}>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ 
                      backgroundColor: '#405D72',
                      color: '#F7E7DC',
                      '&:hover': {
                        backgroundColor: '#758694',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleCreateAccount}>
                    Don't have an account? Sign up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </StyledPaper>
        </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert onClose={() => setSuccess('')} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
