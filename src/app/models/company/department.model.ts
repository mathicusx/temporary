export interface Department {
  id: number;
  name: string;
}

export interface DepartmentResponse {
  status: string;
  Departments: Department[];
}
export interface SaveDepartment {
  id?: number;
  name: string;
}

