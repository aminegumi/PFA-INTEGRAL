import axios from 'axios';

export const fetchEmployeesAPI = async () => {
  return await axios.get('/api/employees');
};
