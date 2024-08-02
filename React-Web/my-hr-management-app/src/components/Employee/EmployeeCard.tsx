import React from 'react';
import { Employee } from '../../types/Employee';
import { Avatar, Box, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface EmployeeCardProps {
  employee: Employee | null;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  if (!employee) {
    return null
  }


  const handleUpdate = () => {
    if (employee) {
      // Handle employee deletion here
      console.log('Update employee informations:', employee);
    }
  };

  return (
    <Box style={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
        backdropFilter: 'blur(10px)',}}>
        <DialogTitle display='flex' >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Avatar src={employee.image} sx={{marginRight: 7}} /> 
            <Box sx={{ flexGrow: 1, marginLeft: '-48px', fontWeight: 'bold', }}>
              {employee.firstname} {employee.lastname}
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ padding: 2}}>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Gender: <span style={{ fontWeight: 'normal' }}>{employee.gender}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Date of Birth: <span style={{ fontWeight: 'normal' }}>{new Date(employee.date_of_birth).toLocaleDateString()}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Email: <span style={{ fontWeight: 'normal' }}>{employee.email}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Phone: <span style={{ fontWeight: 'normal' }}>{employee.phone_number}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Department: <span style={{ fontWeight: 'normal' }}>{employee.departement.label}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Job Category: <span style={{ fontWeight: 'normal' }}>{employee.job_categorie.label}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Hired on: <span style={{ fontWeight: 'normal' }}>{new Date(employee.hired_at).toLocaleDateString()}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Salary: <span style={{ fontWeight: 'normal' }}>{employee.salary}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Marital Status: <span style={{ fontWeight: 'normal' }}>{employee.marital_status}</span></Box>
            <Box sx={{ marginBottom: 2, fontWeight: 'bold', color: '#36454F' }}>Number of Children: <span style={{ fontWeight: 'normal' }}>{employee.nbr_of_children}</span></Box>
          </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleUpdate} variant="outlined"
                    color="primary"
                    sx={{
                      border: '2px solid',
                      borderColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.main,
                      '&:hover': {
                        borderColor: (theme) => theme.palette.primary.dark,
                        color: (theme) => theme.palette.primary.dark,
                        backgroundColor: 'transparent',
                      },
                    }}>
              Edit
            </Button>
        </DialogActions>
    </Box>
  );
};

export default EmployeeCard;