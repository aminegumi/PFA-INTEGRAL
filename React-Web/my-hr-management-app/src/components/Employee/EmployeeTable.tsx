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
    backgroundColor: '#758694', // The darker color from your background
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#405D72', // The color you're using for text elsewhere
  },
}));

const EmployeeTable: React.FC<{ employeeData: any[] }> = ({ employeeData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredEmployees = employeeData.filter(
    (employee) =>
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (departmentFilter === '' || employee.department === departmentFilter) &&
      (roleFilter === '' || employee.role === roleFilter)
  );

  // Extract unique departments
  const departments = Array.from(new Set(employeeData.map((employee) => employee.department)));
  const departmentOptions = ['All Departments', ...departments];

  // Extract unique roles
  const roles = Array.from(new Set(employeeData.map((employee) => employee.role)));
  const roleOptions = ['All Roles', ...roles];

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
              color: '#405D72', // Text color of the label when not focused
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#405D72', // Text color of the label when focused
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
            <MenuItem key={index} value={department === 'All Departments' ? '' : department} style={{ 
                color: 'rgba(224, 224, 224, 1)', 
            }}>
              {department}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          displayEmpty
        >
          {roleOptions.map((role, index) => (
            <MenuItem key={index} value={role === 'All Roles' ? '' : role} style={{ 
                color: 'rgba(224, 224, 224, 1)',  
            }}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </SearchFilterContainer>

      <Box>
        <TableContainerStyled component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Full Name</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((employee) => (
                  <TableRow key={employee.id}>
                    <StyledTableCell>{employee.fullName}</StyledTableCell>
                    <StyledTableCell>{employee.department}</StyledTableCell>
                    <StyledTableCell>{employee.role}</StyledTableCell>
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
      </Box>
    </>
  );
};

export default EmployeeTable;
