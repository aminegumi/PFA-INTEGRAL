import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container,
  Grid
} from '@mui/material';
import { styled } from '@mui/system';

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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
  };

  const handleCreateAccount = (event: React.MouseEvent) => {
    event.preventDefault();
    // Handle create account logic here
    console.log('Create account clicked');
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleCreateAccount}
                  sx={{ 
                    borderColor: '#405D72',
                    color: '#405D72',
                    '&:hover': {
                      backgroundColor: 'rgba(64, 93, 114, 0.04)',
                      borderColor: '#758694',
                    },
                  }}
                >
                  Create 
                </Button>
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default LoginPage;