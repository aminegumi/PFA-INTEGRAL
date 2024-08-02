import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { updateEmployee } from '../../features/employees/employeesSlice';
import { Employee } from '../../types/Employee';
import { Box, TextField, Button, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

interface EmployeeFormProps {
  employee: Employee;
  onCancel: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, onCancel }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Employee>(employee);

  useEffect(() => {
    setFormData(employee);
  }, [employee]);

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | null, fieldName: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: date }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateEmployee({ id: employee.id, employee: formData }));
    onCancel(); // Close the form after submission
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ 
      backgroundColor: 'rgba(255, 248, 243, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: 3,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <TextField
        name="firstname"
        label="First Name"
        value={formData.firstname}
        onChange={handleTextFieldChange}
        fullWidth
        required
      />
      <TextField
        name="lastname"
        label="Last Name"
        value={formData.lastname}
        onChange={handleTextFieldChange}
        fullWidth
        required
      />
      <TextField
        name="email"
        label="Email"
        value={formData.email}
        onChange={handleTextFieldChange}
        fullWidth
        required
        type="email"
      />
      <TextField
        name="phone_number"
        label="Phone"
        value={formData.phone_number}
        onChange={handleTextFieldChange}
        fullWidth
        required
      />
      <FormControl fullWidth>
        <InputLabel>Gender</InputLabel>
        <Select
          name="gender"
          value={formData.gender}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
          <MenuItem value="O">Other</MenuItem>
        </Select>
      </FormControl>
      <DatePicker
        selected={formData.date_of_birth ? new Date(formData.date_of_birth) : null}
        onChange={(date) => handleDateChange(date, 'date_of_birth')}
        dateFormat="MM/dd/yyyy"
        placeholderText="Date of Birth"
        customInput={<TextField fullWidth />}
      />
      <DatePicker
        selected={formData.hired_at ? new Date(formData.hired_at) : null}
        onChange={(date) => handleDateChange(date, 'hired_at')}
        dateFormat="MM/dd/yyyy"
        placeholderText="Hired At"
        customInput={<TextField fullWidth />}
      />
      <TextField
        name="salary"
        label="Salary"
        value={formData.salary}
        onChange={handleTextFieldChange}
        fullWidth
        required
        type="number"
      />
      <FormControl fullWidth>
        <InputLabel>Marital Status</InputLabel>
        <Select
          name="marital_status"
          value={formData.marital_status}
          onChange={handleSelectChange}
          required
        >
          <MenuItem value="single">Single</MenuItem>
          <MenuItem value="married">Married</MenuItem>
          <MenuItem value="divorced">Divorced</MenuItem>
          <MenuItem value="widowed">Widowed</MenuItem>
        </Select>
      </FormControl>
      <TextField
        name="nbr_of_children"
        label="Number of Children"
        value={formData.nbr_of_children}
        onChange={handleTextFieldChange}
        fullWidth
        required
        type="number"
      />
      <FormControl fullWidth>
        <InputLabel>Department</InputLabel>
        <Select
          name="departement"
          value={formData.departement.id.toString()}
          onChange={handleSelectChange}
          required
        >
          {/* You'll need to populate this with actual department options */}
          <MenuItem value="1">Department 1</MenuItem>
          <MenuItem value="2">Department 2</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Job Category</InputLabel>
        <Select
          name="job_categorie"
          value={formData.job_categorie.id.toString()}
          onChange={handleSelectChange}
          required
        >
          {/* You'll need to populate this with actual job category options */}
          <MenuItem value="1">Category 1</MenuItem>
          <MenuItem value="2">Category 2</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 2 }}>
        <Button onClick={onCancel} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
