import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/Employee';
import * as employeesAPI from './employeesAPI';

export interface EmployeesState {
  employees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  status: 'idle',
  error: null,
};


export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    return await employeesAPI.fetchEmployees();
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employee: Partial<Employee>) => {
    return await employeesAPI.createEmployee(employee);
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/updateEmployee',
  async ({ id, employee }: { id: number; employee: Partial<Employee> }) => {
    return await employeesAPI.updateEmployee(id, employee);
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/deleteEmployee',
  async (id: number) => {
    await employeesAPI.deleteEmployee(id);
    return id;
  }
);

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.status = 'succeeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
        const index = state.employees.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<number>) => {
        state.employees = state.employees.filter(e => e.id !== action.payload);
      });
  },
});

export default employeesSlice.reducer;