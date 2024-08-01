// src/types/Employee.ts

export interface JobCategory {
    id: number;
    label: string;
    main_mission: string;
}
  
export interface Department {
    id: number;
    label: string;
}
  
export interface Employee {
    id: number;
    firstname: string;
    lastname: string;
    gender: 'M' | 'F' | 'O'; // Assuming 'O' for Other, adjust if needed
    image: string;
    marital_status: 'S' | 'M' | 'D' | 'W'; // Single, Married, Divorced, Widowed
    date_of_birth: string; // Consider using Date if you parse this
    address: string;
    insurance_number: string;
    nbr_of_children: number;
    email: string;
    phone_number: string;
    salary: number;
    RIB: string;
    job_categorie: JobCategory;
    departement: Department;
    hired_at: string; // Consider using Date if you parse this
    emp_responsable: number | null; // Assuming this is the ID of the responsible employee
}