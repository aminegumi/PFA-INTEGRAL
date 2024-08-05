import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import AppRoutes from './routes';
import StaticBackground from './components/AnimatedBackground';
import './assets/styles/index.css';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#405D72',
    },
    secondary: {
      main: '#F7E7DC',
    },
    background: {
      default: '#FFF8F3',
      paper: '#758694',
    },
    text: {
      primary: '#405D72',
      secondary: '#F7E7DC',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="min-h-screen font-sans antialiased relative">
          <StaticBackground />
          <AppNavbar />
          <main className="pt-16 flex-grow flex items-center justify-center relative z-10">
            <div className='container mx-auto px-4 py-8'>
              <AppRoutes />
            </div>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;