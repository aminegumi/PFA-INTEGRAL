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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Switch,
} from '@mui/material';
import { styled } from '@mui/system';
import { tableCellClasses } from '@mui/material/TableCell';
import { Theme } from '@mui/material/styles';
import { Employee } from '../../types/Employee';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Styled components
const SearchFilterContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
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
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [jobCategoryFilter, setJobCategoryFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showActions, setShowActions] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

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

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedEmployee) {
      // Handle employee deletion here
      console.log('Delete employee:', selectedEmployee);
      setOpenDeleteDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
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

        <Box sx={{ marginRight: 2 }}>
          <Switch
            checked={showActions}
            onChange={() => setShowActions(!showActions)}
            color="primary"
          />
          <span style={{ color: '#36454F' }}>Allow Changes</span>
        </Box>
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
              {showActions && <StyledTableCell>Actions</StyledTableCell>}
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
                  {showActions && (
                    <StyledTableCell>
                      <IconButton aria-label='edit'>
                        <EditIcon style={{ color: '#36454F' }} />
                      </IconButton>
                      <IconButton aria-label='delete' onClick={() => handleDeleteClick(employee)}>
                        <DeleteIcon style={{ color: '#36454F' }} />
                      </IconButton>
                    </StyledTableCell>
                  )}
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
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <Box  style={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
                              backdropFilter: 'blur(10px)',}} > 
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            Are you sure you want to move this employee to the trash?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color='primary'>
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color='primary'>
              Confirm
            </Button>
          </DialogActions>
          </Box> 
      </Dialog>
    </>
  );
};

export default EmployeeTable;
