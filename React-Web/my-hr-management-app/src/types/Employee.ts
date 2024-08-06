// src/types/Employee.ts


import { JobCategory } from "./JobCategory";
import { Department } from "./Department";
  
export interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    gender: 'M' | 'F' | 'O'; // Assuming 'O' for Other, adjust if needed
    image: string;
    marital_status: 'S' | 'M' | 'D' | 'W'; // Single, Married, Divorced, Widowed
    date_of_birth: Date; // Consider using Date if you parse this
    address: string;
    insurance_number: string;
    nbr_of_children: number;
    email: string;
    phone_number: string;
    salary: number;
    RIB: string;
    job_categorie: JobCategory;
    departement: Department;
    hired_at: Date; // Consider using Date if you parse this
    emp_responsable: Employee | null; // Assuming this is the ID of the responsible employee
}