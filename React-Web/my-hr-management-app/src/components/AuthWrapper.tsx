import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const AuthWrapper: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return <Outlet />;
};

export default AuthWrapper;