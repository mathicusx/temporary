export interface Role {
  id: number;
  name: string;
}

export interface RoleResponse {
  status: string;
  Roles: Role[];
}
export interface SaveRole {
  id?: number;
  name: string;
}
