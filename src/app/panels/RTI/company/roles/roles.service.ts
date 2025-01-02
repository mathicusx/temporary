import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/models/company/role.model';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<Role[]> {
    // console.log(this.apiUrl);
    // return this.http.get<Role[]>(`${this.apiUrl}/Admin/import/Roles`);
    const mockRoles: Role[] = [
      {
        id: 1,
        name: 'Role 1',
      },
      {
        id: 2,
        name: 'Role 2',
      },
      {
        id: 3,
        name: 'Role 2',
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockRoles);
  }
}
