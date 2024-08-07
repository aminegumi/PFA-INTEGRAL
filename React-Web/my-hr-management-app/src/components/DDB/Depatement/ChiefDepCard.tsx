import React, { useState } from 'react';
import { Employee } from '../../../types/Employee';
import { Box, DialogContent } from '@mui/material';
import EmployeeForm from '../../Employee/EmployeeForm';

interface EmployeeCardProps {
  employee: Employee | null;
}

const ChiefDepCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const [isEditing, setIsEditing] = useState(false);
  if (!employee) {
    return null
  }


  
  const handleCancelUpdate = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return <EmployeeForm employee={employee} onCancel={handleCancelUpdate} />
  }

  return (
    <Box style={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
        backdropFilter: 'blur(10px)',}}>
        <DialogContent>
          <Box sx={{ padding: 2}}>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Adress: <span style={{ fontWeight: 'normal' }}>{employee.address}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Email: <span style={{ fontWeight: 'normal' }}>{employee.email}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Phone: <span style={{ fontWeight: 'normal' }}>{employee.phone_number}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Gender: <span style={{ fontWeight: 'normal' }}>{employee.gender}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Date of Birth: <span style={{ fontWeight: 'normal' }}>{new Date(employee.date_of_birth).toLocaleDateString()}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Department: <span style={{ fontWeight: 'normal' }}>{employee.departement.label}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Job Category: <span style={{ fontWeight: 'normal' }}>{employee.job_categorie.label}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Hired on: <span style={{ fontWeight: 'normal' }}>{new Date(employee.hired_at).toLocaleDateString()}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Salary: <span style={{ fontWeight: 'normal' }}>{employee.salary}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Marital Status: <span style={{ fontWeight: 'normal' }}>{employee.marital_status}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Number of Children: <span style={{ fontWeight: 'normal' }}>{employee.nbr_of_children}</span></Box>
          </Box>
        </DialogContent>
    </Box>
  );
};

export default ChiefDepCard;