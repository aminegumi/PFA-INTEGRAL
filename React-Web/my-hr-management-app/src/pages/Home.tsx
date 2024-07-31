import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import EmployeeTable from '../components/Employee/EmployeeTable';

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
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  // Mock data - replace with actual data in a real application
  const totalEmployees = 150;
  const departments = 8;
  const openPositions = 5;
  const upcomingInterviews = 3;

  const employeeData = [
    { id: 1, fullName: 'John Doe', department: 'IT', role: 'Developer' },
    { id: 2, fullName: 'Jane Smith', department: 'HR', role: 'Manager' },
    { id: 3, fullName: 'Alice Johnson', department: 'Finance', role: 'Analyst' },
    { id: 4, fullName: 'Bob Brown', department: 'IT', role: 'Developer' },
    { id: 5, fullName: 'Carol White', department: 'Marketing', role: 'Manager' },
    { id: 6, fullName: 'David Green', department: 'IT', role: 'Accountant' },
    { id: 7, fullName: 'Emma Davis', department: 'Sales', role: 'Manager' },
    { id: 8, fullName: 'Frank Harris', department: 'Operations', role: 'Analyst' },
    { id: 9, fullName: 'Grace Lee', department: 'HR', role: 'Recruiter' },
    { id: 10, fullName: 'Henry Wilson', department: 'Finance', role: 'Accountant' },
    { id: 11, fullName: 'Ivy Clark', department: 'IT', role: 'Backend Developer' },
    { id: 12, fullName: 'Jack Martinez', department: 'Marketing', role: 'Accountant' },
    { id: 13, fullName: 'Kara Moore', department: 'Design', role: 'Accountant' },
    { id: 14, fullName: 'Leo Scott', department: 'IT', role: 'Developer' },
    { id: 15, fullName: 'Mia Taylor', department: 'Customer Support', role: 'Developer' },
    { id: 16, fullName: 'Nathan Young', department: 'Operations', role: 'Manager' },
    { id: 17, fullName: 'Olivia Anderson', department: 'Sales', role: 'Manager' },
    { id: 18, fullName: 'Paul Thomas', department: 'Finance', role: 'Analyst' },
    { id: 19, fullName: 'Quinn Hall', department: 'IT', role: 'Recruiter' },
    { id: 20, fullName: 'Rachel Adams', department: 'HR', role: 'Recruiter' },
  ];

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

  return (
    <DashboardContainer>
      <Typography variant="h4" gutterBottom sx={{ 
                                                color: '#405D72',
                                                textAlign: 'center',
                                                marginBottom: 4 }}>
        HR Management Dashboard
      </Typography>
      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} onClick={() => handleItemClick(item.label)}>
            <DashboardItem elevation={3}>
              <IconWrapper>
                {React.cloneElement(item.icon, { style: { color: 'white', fontSize: 30 } })}
              </IconWrapper>
              <Typography variant="h6" component="h2" style={{ color: '#405D72', userSelect: 'text' }}>
                {item.label}
              </Typography>
              <Typography variant="h4" component="p" style={{ color: '#405D72', userSelect: 'text' }}>
                {item.value}
              </Typography>
            </DashboardItem>
          </Grid>
        ))}
      </Grid>

      {showEmployeeDetails && <EmployeeTable employeeData={employeeData} />}
    </DashboardContainer>
  );
};

export default Home;
