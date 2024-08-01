import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/system';
import { tableCellClasses } from '@mui/material/TableCell';
import { Theme } from '@mui/material/styles';
import { Employee } from '../../types/Employee';

// Styled components
const SearchFilterContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const TableContainerStyled = styled(TableContainer)<{ theme: Theme }>(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: 'rgba(255, 248, 243, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#758694',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#405D72',
  },
}));

interface EmployeeTableProps {
  employeeData: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employeeData }) => {
  console.log(Array.isArray(employeeData)); // Should be true
  console.log(employeeData);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [jobCategoryFilter, setJobCategoryFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredEmployees = employeeData.filter(
    (employee) =>
      `${employee.firstname} ${employee.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter === '' || employee.departement.label === departmentFilter) &&
      (jobCategoryFilter === '' || employee.job_categorie.label === jobCategoryFilter)
  );

  // Extract unique departments
  const departments = Array.from(new Set(employeeData.map((employee) => employee.departement.label)));
  const departmentOptions = ['All Departments', ...departments];

  // Extract unique job categories
  const jobCategories = Array.from(new Set(employeeData.map((employee) => employee.job_categorie.label)));
  const jobCategoryOptions = ['All Job Categories', ...jobCategories];

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <SearchFilterContainer>
        <TextField
          label="Search Employees"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            marginRight: 2,
            '& .MuiInputLabel-root': {
              color: '#405D72',
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#405D72',
            },
          }}
        />

        <Select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          displayEmpty
          sx={{ marginRight: 2 }}
        >
          {departmentOptions.map((department, index) => (
            <MenuItem key={index} value={department === 'All Departments' ? '' : department}>
              {department}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={jobCategoryFilter}
          onChange={(e) => setJobCategoryFilter(e.target.value)}
          displayEmpty
        >
          {jobCategoryOptions.map((category, index) => (
            <MenuItem key={index} value={category === 'All Job Categories' ? '' : category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </SearchFilterContainer>

      <TableContainerStyled component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Department</StyledTableCell>
              <StyledTableCell>Job Category</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Date Of Birth</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEmployees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((employee) => (
                <TableRow key={employee.id}>
                  <StyledTableCell>{`${employee.firstname} ${employee.lastname}`}</StyledTableCell>
                  <StyledTableCell>{employee.departement.label}</StyledTableCell>
                  <StyledTableCell>{employee.job_categorie.label}</StyledTableCell>
                  <StyledTableCell>{employee.email}</StyledTableCell>
                  <StyledTableCell>{employee.phone_number}</StyledTableCell>
                  <StyledTableCell>{employee.date_of_birth}</StyledTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainerStyled>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default EmployeeTable;