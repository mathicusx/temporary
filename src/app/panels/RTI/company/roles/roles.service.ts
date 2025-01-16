import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Role, RoleResponse, SaveRole } from 'src/app/models/company/role.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getRoles(): Observable<RoleResponse> {
    return this.http.post<RoleResponse>(
      `${this.apiUrl}/Company/Roles`,
      {}
    );
  }

  saveRole(role: SaveRole): Observable<SaveRole> {
    const cleanedPayload = cleanPayload(role);
    if (cleanedPayload.id) {
      return this.http.put<SaveRole>(
        `${this.apiUrl}/Company/Role/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveRole>(
        `${this.apiUrl}/Company/Role/`,
        cleanedPayload
      );
    }
  }
}
