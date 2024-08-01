import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchEmployees } from '../../features/employees/employeesSlice';
import EmployeeCard from './EmployeeCard';

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { employees, status, error } = useAppSelector(state => state.employees);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Employees</h2>
      {employees.map(employee => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeeList;