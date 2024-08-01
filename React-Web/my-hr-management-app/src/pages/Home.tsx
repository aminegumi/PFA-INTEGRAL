import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import EmployeeTable from '../components/Employee/EmployeeTable';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchEmployees } from '../features/employees/employeesSlice';
import { useEffect } from 'react';


const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const DashboardItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
  backdropFilter: 'blur(10px)', // Adds a blur effect
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const {employees, status, error } = useAppSelector(state => state.employees);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  // In Home.tsx
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees())
        .then(() => console.log('Employees fetched:', employees))
        .catch(error => console.error('Error fetching employees:', error));
    }
  }, [status, dispatch]);

  // Mock data - replace with actual data in a real application
  const totalEmployees = employees.length;
  const departments = 8;
  const openPositions = 5;
  const upcomingInterviews = 3;

    const dashboardItems = [
    { icon: <PeopleIcon />, label: 'Total Employees', value: totalEmployees },
    { icon: <BusinessIcon />, label: 'Departments', value: departments },
    { icon: <WorkIcon />, label: 'Open Positions', value: openPositions },
    { icon: <EventIcon />, label: 'Upcoming Interviews', value: upcomingInterviews },
  ];

  const handleItemClick = (label: string) => {
    if (label === 'Total Employees') {
      setShowEmployeeDetails(!showEmployeeDetails);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed' ) return <div>Error: {error}</div>;

  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom sx={{ 
                                                color: '#405D72',
                                                textAlign: 'center',
                                                marginBottom: 4,
                                                cursor: 'default' }}>
        HR Management Dashboard
      </Typography>
      <Grid container spacing={3} style={{cursor: 'pointer'}}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} onClick={() => handleItemClick(item.label)}>
            <DashboardItem elevation={3}>
              <IconWrapper>
                {React.cloneElement(item.icon, { style: { color: 'white', fontSize: 30 }})}
              </IconWrapper>
              <Typography variant="h6" component="h2" style={{ color: '#405D72', userSelect: 'text'}}>
                {item.label}
              </Typography>
              <Typography variant="h4" component="p" style={{ color: '#405D72', userSelect: 'text'}}>
                {item.value}
              </Typography>
            </DashboardItem>
          </Grid>
        ))}
      </Grid>

      {showEmployeeDetails && Array.isArray(employees) && <EmployeeTable employeeData={employees} />}
    </DashboardContainer>
  );
};


export default Home;

