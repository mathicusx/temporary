import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Site } from 'src/app/models/company/site.model';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getSites(): Observable<Site[]> {
    // console.log(this.apiUrl);
    // return this.http.get<Site[]>(`${this.apiUrl}/Admin/import/formats`);
    const mockSites: Site[] = [
      {
        id: 1,
        name: 'Site 1',
      },
      {
        id: 2,
        name: 'Site 2',
      },
      {
        id: 3,
        name: 'Site 2',
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockSites);
  }
}
