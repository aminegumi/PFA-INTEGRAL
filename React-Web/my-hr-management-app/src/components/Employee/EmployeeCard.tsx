import React from 'react';
import { Employee } from '../../types/Employee';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="employee-card">
      <img src={employee.image} alt={`${employee.firstname} ${employee.lastname}`} />
      <h3>{employee.firstname} {employee.lastname}</h3>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone_number}</p>
      <p>Department: {employee.departement.label}</p>
      <p>Job Category: {employee.job_categorie.label}</p>
      <p>Hired on: {new Date(employee.hired_at).toLocaleDateString()}</p>
    </div>
  );
};

export default EmployeeCard;