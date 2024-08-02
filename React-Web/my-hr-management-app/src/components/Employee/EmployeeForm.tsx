import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateEmployee } from '../../features/employees/employeesSlice';
import { Employee } from '../../types/Employee';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Typography } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { styled } from '@mui/system';

interface EmployeeFormProps {
  employee: Employee | null;
  onCancel: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 248, 243, 0.8)',
  backdropFilter: 'blur(10px)',
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiInputLabel-root': {
    padding: '0 4px',
    color: '#36454F',
    '&.Mui-focused': {
      color: '#36454F',
    },
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#405D72',
    },
    '&:hover fieldset': {
      borderColor: '#36454F',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#36454F',
    },
  },
  '& .MuiSelect-select': {
    color: '#36454F',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(1),
}));

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onCancel }) => {
  if(!employee){
    return null
  }
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Employee>(employee);

  useEffect(() => {
    setFormData(employee);
    console.log(formData);
  }, [employee]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(e)
  };

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateEmployee({ id: employee.id, employee: formData }));
    onCancel();
  };

  return (
    <StyledBox component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom sx={{ color: '#36454F', fontWeight: 'bold' }}>
        Edit Employee Information
      </Typography>
      <StyledFormControl fullWidth>
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleTextFieldChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <TextField
          name="phone_number"
          label="Phone"
          value={formData.phone_number}
          onChange={handleTextFieldChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          name="gender"
          value={formData.gender}
          onChange={handleSelectChange}
          required
          label="Gender"
        > <Box style={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
                      backdropFilter: 'blur(10px)',}}>
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="O">Other</MenuItem>
          </Box>
        </Select>
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <DatePicker
          selected={formData.date_of_birth ? new Date(formData.date_of_birth) : null}
          onChange={(date) => handleDateChange(date, 'date_of_birth')}
          dateFormat="MM/dd/yyyy"
          customInput={
            <TextField 
              label="Date of Birth" 
              fullWidth 
              InputLabelProps={{ shrink: true }}
            />
          }
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <DatePicker
          selected={formData.hired_at ? new Date(formData.hired_at) : null}
          onChange={(date) => handleDateChange(date, 'hired_at')}
          dateFormat="MM/dd/yyyy"
          customInput={
            <TextField 
              label="Hired At" 
              fullWidth 
              InputLabelProps={{ shrink: true }}
            />
          }
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <TextField
          name="salary"
          label="Salary"
          value={formData.salary}
          onChange={handleTextFieldChange}
          fullWidth
          required
          type="number"
          InputLabelProps={{ shrink: true }}
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel id="marital-status-label">Marital Status</InputLabel>
        <Select
          labelId="marital-status-label"
          name="marital_status"
          value={formData.marital_status}
          onChange={handleSelectChange}
          required
          label="Marital Status"
        > <Box style={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
                        backdropFilter: 'blur(10px)',}}>
            <MenuItem value="S">Single</MenuItem>
            <MenuItem value="M">Married</MenuItem>
            <MenuItem value="D">Divorced</MenuItem>
            <MenuItem value="W">Widowed</MenuItem>
          </Box>
        </Select>
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <TextField
          name="nbr_of_children"
          label="Number of Children"
          value={formData.nbr_of_children}
          onChange={handleTextFieldChange}
          fullWidth
          required
          type="number"
          InputLabelProps={{ shrink: true }}
        />
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          name="departement"
          value={formData.departement.label}
          onChange={handleSelectChange}
          required
          label="Department"
        > 
          <Box style={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
                      backdropFilter: 'blur(10px)',}}>
            <MenuItem value="1">Department 1</MenuItem>
            <MenuItem value="2">Department 2</MenuItem>
          </Box>
        </Select>
      </StyledFormControl>
      <StyledFormControl fullWidth>
        <InputLabel id="job-category-label">Job Category</InputLabel>
        <Select
          labelId="job-category-label"
          name="job_categorie"
          value={formData.job_categorie.label}
          onChange={handleSelectChange}
          required
          label="Job Category"
        > <Box style={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
                      backdropFilter: 'blur(10px)',}}>
            <MenuItem value="1">Category 1</MenuItem>
            <MenuItem value="2">Category 2</MenuItem>
          </Box>
        </Select>
      </StyledFormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <StyledButton onClick={onCancel} variant="outlined" color="primary">
          Cancel
        </StyledButton>
        <StyledButton type="submit" variant="contained" color="primary">
          Save Changes
        </StyledButton>
      </Box>
    </StyledBox>
  );
};

export default EmployeeForm;