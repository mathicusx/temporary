import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Format } from 'src/app/models/admin/formats.model';
import { Company } from 'src/app/models/admin/admin-company.model';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    // console.log(this.apiUrl);
    // return this.http.get<Format[]>(`${this.apiUrl}/Admin/import/formats`);
    const mockCompanies: Company[] = [
      {
        id: 1,
        name: 'Company 1',
      },
      {
        id: 2,
        name: 'Company 2',
      },
      {
        id: 3,
        name: 'Company 2',
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockCompanies);
  }
}
