import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import AppNavbar from './components/Navbar';
import AppRoutes from './routes';
import AnimatedBackground from './components/AnimatedBackground';
import './assets/styles/index.css';

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <Router>
        <div className="min-h-screen font-sans antialiased relative">
          <AnimatedBackground />
          <AppNavbar />
          <main className="flex-grow flex items-center justify-center relative z-10">
            <div className='container mx-auto px-4 py-8'>
              <AppRoutes />
            </div>
          </main>
        </div>
      </Router>
    </NextUIProvider>
  );
};


export default App;