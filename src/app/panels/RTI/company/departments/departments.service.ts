import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Department,
  DepartmentResponse,
  SaveDepartment,
} from 'src/app/models/company/department.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<DepartmentResponse> {
    return this.http.post<DepartmentResponse>(
      `${this.apiUrl}/Company/Departments`,
      {}
    );
  }

  saveDepartment(department: SaveDepartment): Observable<SaveDepartment> {
    const cleanedPayload = cleanPayload(department);
    if (cleanedPayload.id) {
      return this.http.put<SaveDepartment>(
        `${this.apiUrl}/Company/Department/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveDepartment>(
        `${this.apiUrl}/Company/Department/`,
        cleanedPayload
      );
    }
  }
}
