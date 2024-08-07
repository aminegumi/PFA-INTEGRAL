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


const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setError('');
      setSuccess('');
  
      if (password !== confirmPassword) {
        setError("Passwords don't match");
        return;
      }
  
      try {
        const response = await api.post('/api/register/', { username, email, password });
        setSuccess('Registration successful');
        console.log('Registration successful', response.data);
        // Optionally, you can automatically log in the user here
        // by calling the login API and storing the token
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (err) {
        console.log('Registration successful', err);
        if (err.response) {
          setError(err.response.data.message || 'Registration failed');
        } else {
          setError('An unexpected error occurred');
        }
      }
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
            Create Account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="new-password"
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3,
                mb: 2,
                backgroundColor: '#405D72',
                color: '#F7E7DC',
                '&:hover': {
                  backgroundColor: '#758694',
                },
              }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
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

export default RegisterPage;