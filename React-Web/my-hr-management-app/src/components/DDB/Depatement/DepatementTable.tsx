import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Theme,
  tableCellClasses,
  TextField,
  Box,
  Switch,
  Button,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/system';
import { Department } from '../../../types/Department';
import AddIcon from '@mui/icons-material/Add';
import BusinessIcon from '@mui/icons-material/Business';
import EmployeeCard from '../../Employee/EmployeeCard';
import { Employee } from '../../../types/Employee';
import { fetchEmployeeById } from '../../../features/employees/employeesAPI';
import ChiefDepCard from './ChiefDepCard';

const SearchFilterContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
}));

const AddDepartmentButton = styled(Button)(({ theme }) => ({
  marginLeft: 'auto',
  backgroundColor: '#758694',
  color: 'white',
  '&:hover': {
    backgroundColor: '#405D72',
  },
}));

const StyledTableContainer = styled(TableContainer)<{ theme: Theme }>(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: 'rgba(255, 248, 243, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  maxHeight: '70vh', // Limit the height to enable scrolling
  overflowY: 'auto', // Enable vertical scrolling
  '&::-webkit-scrollbar': {
    width: '12px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 248, 243, 0.5)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#758694',
    borderRadius: '10px',
    border: '3px solid rgba(255, 248, 243, 0.5)',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#405D72',
  },
  scrollbarWidth: 'thin',
  scrollbarColor: '#758694 rgba(255, 248, 243, 0.5)',
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


interface DepartmentTableProps {
  departmentData: Department[];
}


const DepartmentTable: React.FC<DepartmentTableProps> = ({ departmentData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [assosiatedEmp, setAssosiatedEmp] = useState<Employee | null>(null)
  

  const filteredDepartments = departmentData.filter(
    (department) =>
      `${department.label}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setOpenEditForm(true);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (department: Department) => {
    setSelectedDepartment(department);
    setOpenEditForm(true);
  };


  const handleCellClick = async (department: Department) => {
    if(department.responsable){
      // Display the employee card if a chief is assigned
      setSelectedDepartment(department);
      setAssosiatedEmp(await fetchEmployeeById(department.responsable.id))
      setOpenDialog(true);
    }else{
      setSelectedDepartment(department);
      setOpenDialog(true);
    }
  }

  const handleConfirmAssignChief = () => {
    // Logic to assign here
    console.log(`Assigned ${selectedEmployee} as chief of department ${selectedDepartment?.label}`);
    setOpenDialog(false);
  }

  return (
    <>
      <SearchFilterContainer>
        <TextField
          label="Search Departments"
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

        <Box sx={{ marginRight: 2 }}>
          <Switch
            checked={showActions}
            onChange={() => setShowActions(!showActions)}
            color="primary"
          />
          <span style={{ color: '#36454F' }}>Allow Changes</span>
        </Box>
        <AddDepartmentButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
        >
          Add Department
        </AddDepartmentButton>
      </SearchFilterContainer>
      <StyledTableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Label</StyledTableCell>
              <StyledTableCell>department chief</StyledTableCell>
              <StyledTableCell>Numbre of employees</StyledTableCell>
              {showActions && (<StyledTableCell>Actions</StyledTableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDepartments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((department) => (
                <TableRow key={department.id}>
                  <StyledTableCell>
                    <IconButton>
                      <BusinessIcon style={{ color: '#36454F' }}/>
                    </IconButton>
                    
                  </StyledTableCell>
                  <StyledTableCell>{department.id}</StyledTableCell>
                  <StyledTableCell>{department.label}</StyledTableCell>
                  <StyledTableCell onClick={() => handleCellClick(department)}>
                    {department.responsable
                      ? `${department.responsable.firstname} ${department.responsable.lastname}`
                      : 'No Chief Assigned'}
                  </StyledTableCell>
                  <StyledTableCell>{department.nbr_emps}</StyledTableCell>
                  {showActions && (
                    <StyledTableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(department)}
                      >
                        <EditIcon style={{ color: '#36454F' }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                       // onClick={() => handleDeleteClick(department)}
                      >
                        <DeleteIcon style={{ color: '#36454F' }} />
                      </IconButton>
                    </StyledTableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredDepartments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
       <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
       <DialogTitle 
          justifyContent={'center'} 
          sx={{
            backgroundColor: 'rgba(255, 248, 243, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '16px', // Add some padding
          }}
        >
          {selectedDepartment?.responsable ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Avatar 
                src={selectedDepartment.responsable.image} 
                sx={{marginRight: 2}} 
                alt={`${selectedDepartment.responsable.firstname} ${selectedDepartment.responsable.lastname}`}
              /> 
              <Box sx={{ fontWeight: 'bold' }}>
                {selectedDepartment.responsable.firstname} {selectedDepartment.responsable.lastname}
              </Box>
            </Box>
          ) : (
            'Assign Chief'
          )}
        </DialogTitle>
        <DialogContent sx={{backgroundColor: 'rgba(255, 248, 243, 0.8)',
        backdropFilter: 'blur(10px)',}}>
          {selectedDepartment?.responsable ? (
            <ChiefDepCard employee={assosiatedEmp} />
          ) : (
            <>
              <p>Do you want to assign a chief to this department?</p>
              <Select
                value={selectedDepartment?.employes}
                onChange={(e) => setSelectedEmployee(e.target.value as unknown as Employee)}
                fullWidth
              >
                {selectedDepartment?.employes.map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>
                      {employee.firstname} {employee.lastname}
                    </MenuItem>
                  ))
                }
              </Select>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'rgba(255, 248, 243, 0.8)',backdropFilter: 'blur(10px)',}}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          {!selectedDepartment?.responsable && (
            <Button onClick={handleConfirmAssignChief} color="primary">
              Confirm
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

  export default DepartmentTable;