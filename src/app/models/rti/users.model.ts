export interface Company {
  id: number;
}

export interface User {
  id: number;
  email: string;
  roles: string[];
  name: string;
  createdDatetime: string;
  company: Company | null;
}

export interface UsersResponse {
  Users: User[];
}
