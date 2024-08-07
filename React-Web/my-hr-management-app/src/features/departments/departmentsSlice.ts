import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Department } from '../../types/Department';
import * as departmentsAPI from './departementsAPI';

export interface DepartmentsState {
  departments: Department[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DepartmentsState = {
  departments: [],
  status: 'idle',
  error: null,
};

export const fetchDepartments = createAsyncThunk(
  'departments/fetchDepartments',
  async () => {
    return await departmentsAPI.fetchDepartments();
  }
);

export const fetchDepartmentsWithEmps = createAsyncThunk(
  'departments/fetchDepartmentsWithEmps',
  async () => {
    return await departmentsAPI.fetchDepartmentsWithEmps();
  }
);

export const addDepartment = createAsyncThunk(
  'departments/addDepartment',
  async (department: Partial<Department>) => {
    return await departmentsAPI.createDepartment(department);
  }
);

export const updateDepartment = createAsyncThunk(
  'departments/updateDepartment',
  async ({ id, label }: { id: number; label: Partial<Department> }) => {
    return await departmentsAPI.updateDepartment(id, label);
  }
);

export const deleteDepartment = createAsyncThunk(
  'departments/deleteDepartment',
  async (id: number) => {
    await departmentsAPI.deleteDepartment(id);
    return id;
  }
);

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartments.fulfilled, (state, action: PayloadAction<Department[]>) => {
        state.status = 'succeeded';
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(addDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        state.departments.push(action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action: PayloadAction<Department>) => {
        const index = state.departments.findIndex(d => d.id === action.payload.id);
        if (index !== -1) {
          state.departments[index] = action.payload;
        }
      })
      .addCase(deleteDepartment.fulfilled, (state, action: PayloadAction<number>) => {
        state.departments = state.departments.filter(d => d.id !== action.payload);
      }).addCase(fetchDepartmentsWithEmps.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDepartmentsWithEmps.fulfilled, (state, action: PayloadAction<Department[]>) => {
        state.status = 'succeeded';
        state.departments = action.payload;
      })
      .addCase(fetchDepartmentsWithEmps.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error occurred';
      });
  },
});

export default departmentsSlice.reducer;