import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { addDepartment, updateDepartment } from '../../../features/departments/departmentsSlice';
import { Department } from '../../../types/Department';
import { AppDispatch } from '../../../app/store';

interface DepartmentFormProps {
  department?: Department;
  onCancel: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 248, 243, 0.8)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const DepartmentForm: React.FC<DepartmentFormProps> = ({ department, onCancel }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState(department?.label || '');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (department) {
        await dispatch(updateDepartment({ id: department.id, label: { label: name } }));
      } else {
        await dispatch(addDepartment({ label: name }));
      }
      onCancel();
    };
  
    return (
      <StyledBox component="form" onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <StyledButton onClick={onCancel} variant="outlined" color="primary">
            Cancel
          </StyledButton>
          <StyledButton type="submit" variant="contained" color="primary">
            {department ? 'Update Department' : 'Add Department'}
          </StyledButton>
        </Box>
      </StyledBox>
    );
  };
  
export default DepartmentForm;