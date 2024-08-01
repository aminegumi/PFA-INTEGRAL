import api from './api';

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/token/', { username, password });
  const { token } = response.data;
  localStorage.setItem('token', token);
  return token;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};