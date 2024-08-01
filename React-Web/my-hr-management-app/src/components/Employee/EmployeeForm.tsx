import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { addEmployee, updateEmployee } from '../../features/employees/employeesSlice';
import { Employee } from '../../types/Employee';

interface EmployeeFormProps {
  employee?: Employee; // Optional, if editing an existing employee
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Partial<Employee>>(employee || {});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employee) {
      dispatch(updateEmployee({ id: employee.id, employee: formData }));
    } else {
      dispatch(addEmployee(formData));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        name="firstname" 
        value={formData.firstname || ''} 
        onChange={handleChange} 
        placeholder="First Name"
        required
      />
      <input 
        name="lastname" 
        value={formData.lastname || ''} 
        onChange={handleChange} 
        placeholder="Last Name"
        required
      />
      <input 
        name="email" 
        value={formData.email || ''} 
        onChange={handleChange} 
        placeholder="Email"
        type="email"
        required
      />
      {/* Add more fields as needed */}
      <button type="submit">{employee ? 'Update' : 'Add'} Employee</button>
    </form>
  );
};

export default EmployeeForm;