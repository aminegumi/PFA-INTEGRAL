import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

// Placeholder components
const PlaceholderComponent: React.FC<{ name: string }> = ({ name }) => (
  <div>{name} pages where we will go after completing the code</div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/employees" element={<PlaceholderComponent name="Employees" />} />
      <Route path="/departments" element={<PlaceholderComponent name="Departments" />} />
      <Route path="/job-categories" element={<PlaceholderComponent name="Job Categories" />} />
      <Route path="*" element={<PlaceholderComponent name="Not Found" />} />
    </Routes>
  );
};

export default AppRoutes;