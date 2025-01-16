import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SaveUser, UsersResponse } from 'src/app/models/rti/users.model';
import { HttpClient } from '@angular/common/http';
import { cleanPayload } from 'src/app/_helpers/clean-payload';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/Hr/Users`);
  }

  saveUser(user: SaveUser): Observable<SaveUser> {
    const cleanedPayload = cleanPayload(user);
    if (cleanedPayload.id) {
      return this.http.put<SaveUser>(
        `${this.apiUrl}/Hr/User/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveUser>(
        `${this.apiUrl}/Hr/User/`,
        cleanedPayload
      );
    }
  }
}
