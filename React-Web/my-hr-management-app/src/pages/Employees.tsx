import React, { useState } from 'react';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeForm from '../components/Employee/EmployeeForm';

const EmployeesPage: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div>
      <h1>Employees Page</h1>
      <button onClick={() => setIsAdding(!isAdding)}>
        {isAdding ? 'Cancel' : 'Add New Employee'}
      </button>
      {isAdding && <EmployeeForm />}
      <EmployeeList />
    </div>
  );
};

export default EmployeesPage;