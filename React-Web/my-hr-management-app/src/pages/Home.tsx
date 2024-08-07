import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import EmployeeTable from '../components/Employee/EmployeeTable';
import DepartmentTable from '../components/DDB/Depatement/DepatementTable';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchEmployees } from '../features/employees/employeesSlice';
import AppNavbar from '../components/Navbar';
import { fetchDepartmentsWithEmps } from '../features/departments/departmentsSlice';
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
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
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
  const { employees, status: employeeStatus, error: employeeError } = useAppSelector(state => state.employees);
  const { departments, status: departmentStatus, error: departmentError } = useAppSelector(state => state.departments);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showDepartmentDetails, setShowDepartmentDetails] = useState(false);
  
  useEffect(() => {
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees())
        .then(() => console.log('Employees fetched:', employees))
        .catch(error => console.error('Error fetching employees:', error));
    }
    if (departmentStatus === 'idle') {
      dispatch(fetchDepartmentsWithEmps())
        .then(() => console.log('Departments fetched:', departments))
        .catch(error => console.error('Error fetching departments:', error));
    }
  }, [employeeStatus, departmentStatus, dispatch]);
  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  const openPositions = 5; // Mock data
  const upcomingInterviews = 3; // Mock data

  const dashboardItems = [
    { icon: <PeopleIcon />, label: 'Total Employees', value: totalEmployees },
    { icon: <BusinessIcon />, label: 'Departments', value: totalDepartments },
    { icon: <WorkIcon />, label: 'Open Positions', value: openPositions },
    { icon: <EventIcon />, label: 'Upcoming Interviews', value: upcomingInterviews },
  ];

  const handleItemClick = (label: string) => {
    if (label === 'Total Employees') {
      setShowEmployeeDetails(!showEmployeeDetails);
      setShowDepartmentDetails(false);
    } else if (label === 'Departments') {
      setShowDepartmentDetails(!showDepartmentDetails);
      setShowEmployeeDetails(false);
      console.log('clicked : ', showDepartmentDetails);
    }
  };

  if (employeeStatus === 'loading' || departmentStatus === 'loading') return <div>Loading...</div>;
  if (employeeStatus === 'failed') return <div>Error: {employeeError}</div>;
  if (departmentStatus === 'failed') return <div>Error: {departmentError}</div>;

  return (
    <>
      <AppNavbar />
      <DashboardContainer>
        <Typography variant="h4" gutterBottom sx={{
          color: '#405D72',
          textAlign: 'center',
          marginBottom: 4,
          cursor: 'default'
        }}>
          HR Management Dashboard
        </Typography>
        <Grid container spacing={3} style={{ cursor: 'pointer' }}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} onClick={() => handleItemClick(item.label)}>
              <DashboardItem elevation={3} style={{
                backgroundColor: 'rgba(255, 248, 243, 0.8)',
                backdropFilter: 'blur(10px)',
              }}>
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

        {showEmployeeDetails && Array.isArray(employees) && <EmployeeTable employeeData={employees} />}
        {showDepartmentDetails && Array.isArray(departments) && <DepartmentTable departmentData={departments}/>}
      </DashboardContainer>
    </>
  );
};

export default Home;