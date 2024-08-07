import axios from 'axios';
import { Employee } from '../../types/Employee';

// const API_URL = import.meta.env.VITE_API_BASE_URL;

const employeesApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/employee',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
employeesApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await employeesApi.get<Employee[]>('/');
    console.log('API Response:', response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const fetchEmployeeById = async (id: number): Promise<Employee> => {
  const response = await employeesApi.get<Employee>(`/${id}/`);
  return response.data;
};

export const createEmployee = async (employeeData: Partial<Employee>): Promise<Employee> => {
  const response = await employeesApi.post<Employee>('/', employeeData);
  return response.data;
};

export const updateEmployee = async (id: number, employeeData: Partial<Employee>): Promise<Employee> => {
  const response = await employeesApi.put<Employee>(`/${id}/`, employeeData);
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await employeesApi.delete(`/${id}/`);
};