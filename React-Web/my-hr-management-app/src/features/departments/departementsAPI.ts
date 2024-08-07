import axios from 'axios';
import { Department } from '../../types/Department';


const departmentsApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/departement',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the authentication token
departmentsApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

export const fetchDepartments =  async (): Promise<Department[]> => {
  try {
    const response = await departmentsApi.get<Department[]>('/');
    console.log('Dept Api response: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const fetchDepartmentsWithEmps = async (): Promise<Department[]> => {
  try {
    const response = await departmentsApi.get<Department[]>('/list_department_employees/');
    console.log('Dept Api response all: ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching departments with employees:', error);
    throw error;
  }
};

export const fetchDepartmentById = async (id: number): Promise<Department> => {
  const response = await departmentsApi.get<Department>(`/${id}/`);
  return response.data;
};

export const createDepartment = async (departmentData: Partial<Department>): Promise<Department> => {
  const response = await departmentsApi.post<Department>('/', departmentData);
  return response.data;
};

export const updateDepartment = async (id: number, departmentData: Partial<Department>): Promise<Department> => {
  const response = await departmentsApi.put<Department>(`/${id}/`, departmentData);
  return response.data;
};

export const deleteDepartment = async (id: number): Promise<void> => {
  await departmentsApi.delete(`/${id}/`);
};

