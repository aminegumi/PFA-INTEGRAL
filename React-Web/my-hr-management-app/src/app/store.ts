import { configureStore } from '@reduxjs/toolkit';
import departmentsReducer from '../features/departments/departmentsSlice';
import employeesReducer from '../features/employees/employeesSlice';

export const store = configureStore({
  reducer: {
    departments: departmentsReducer,
    employees: employeesReducer,
    // Ajoutez d'autres reducers ici si nécessaire
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;