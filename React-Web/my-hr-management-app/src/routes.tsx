import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AuthWrapper from './components/AuthWrapper';

// Placeholder components
const PlaceholderComponent: React.FC<{ name: string }> = ({ name }) => (
  <div>{name} pages where we will go after completing the code</div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes> 
      <Route path="/register" element={<RegisterPage />} /> 
      <Route element={<AuthWrapper />}>    
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute/>}>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<PlaceholderComponent name="Employees" />} />
          <Route path="/departments" element={<PlaceholderComponent name="Departments" />} />
          <Route path="/job-categories" element={<PlaceholderComponent name="Job Categories" />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;