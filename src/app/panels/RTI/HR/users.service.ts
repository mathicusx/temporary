import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company, User } from 'src/app/models/rti/users.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    // console.log(this.apiUrl);
    // return this.http.get<User[]>(`${this.apiUrl}/Hr/Users`);
    const mockUsers: User[] = [
      {
        id: 1,
        email: 'john.doe@example.com',
        roles: ['Admin', 'Manager'],
        name: 'John Doe',
        createdDatetime: '2024-01-01T10:00:00Z',
        company: {
          id: 1,
          name: 'TechCo',
          location: 'New York',
        } as Company,
      },
      {
        id: 2,
        email: 'jane.doe@example.com',
        roles: ['User'],
        name: 'Jane Doe',
        createdDatetime: '2024-01-02T11:00:00Z',
        company: null,
      },
      {
        id: 3,
        email: 'sam.smith@example.com',
        roles: ['Advanced'],
        name: 'Sam Smith',
        createdDatetime: '2024-01-03T12:00:00Z',
        company: {
          id: 2,
          name: 'InnoTech',
          location: 'San Francisco',
        } as Company,
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockUsers);
  }
}
