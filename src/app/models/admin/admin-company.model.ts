export interface CompaniesResponse {
  status: string;
  Companies: Company[];
}

export interface Company {
  id: number;
  name: string;
}

export interface SaveCompany{
  id?: number;
  inActive?: boolean;
  name: string;
}
