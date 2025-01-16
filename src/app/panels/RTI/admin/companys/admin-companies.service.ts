import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  CompaniesResponse,
  Company,
  SaveCompany,
} from 'src/app/models/admin/admin-company.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<CompaniesResponse> {
    return this.http.get<CompaniesResponse>(`${this.apiUrl}/Admin/Companys/`);
  }

  saveCompany(company: SaveCompany): Observable<SaveCompany> {
    const cleanedPayload = cleanPayload(company);
    if (cleanedPayload.id) {
      return this.http.put<SaveCompany>(
        `${this.apiUrl}/Admin/Company/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveCompany>(
        `${this.apiUrl}/Admin/Company/`,
        cleanedPayload
      );
    }
  }
}
