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
  status: string;
  Users: User[];
}

export interface SaveUser {
  id?: number;
  name: string;
  email: string;
  company: number;
  roles: string[];
}
