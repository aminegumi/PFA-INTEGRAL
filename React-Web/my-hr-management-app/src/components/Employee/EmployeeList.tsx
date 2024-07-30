import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchEmployees } from '../../features/employees/employeesSlice';

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const employees = useAppSelector((state) => state.employees.employees);
  const employeeStatus = useAppSelector((state) => state.employees.status);

  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  return (
    <div>
      <h1>Employee List</h1>
      {employees.map((employee) => (
        <div key={employee.id}>
          {employee.firstname} {employee.lastname}
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
