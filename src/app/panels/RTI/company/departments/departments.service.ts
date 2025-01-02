import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Department } from 'src/app/models/company/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<Department[]> {
    // console.log(this.apiUrl);
    // return this.http.get<Department[]>(`${this.apiUrl}/Comnpany/1/Departments`);
    const mockDepartments: Department[] = [
      {
        id: 1,
        name: 'Department 1',
      },
      {
        id: 2,
        name: 'Department 2',
      },
      {
        id: 3,
        name: 'Department 2',
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockDepartments);
  }
}
