import { configureStore } from '@reduxjs/toolkit';
import employeesReducer from '../features/employees/employeesSlice';
import departmentsSlice from '../features/departments/departmentsSlice';

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    departments: departmentsSlice,
    // Ajoutez d'autres reducers ici si nécessaire
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;