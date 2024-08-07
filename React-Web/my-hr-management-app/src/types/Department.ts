
import { Employee, SimpleEmp } from "./Employee";

export interface Department {
    id: number;
    label: string;
    employes: Employee[];
    responsable: SimpleEmp;
    nbr_emps: number;
}