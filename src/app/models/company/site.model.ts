export interface Site {
  id: number;
  company?: {
    id: number;
    name: string;
  };
  name: string;
  inactive?: boolean;
  region?: {
    id: number;
    name: string;
  } | null;
  roles?: any[]; // Adjust the type of roles if a specific type is expected, such as Role[]
}
