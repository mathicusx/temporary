import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Region } from 'src/app/models/company/region.model';

@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<Region[]> {
    // console.log(this.apiUrl);
    // return this.http.get<Region[]>(`${this.apiUrl}/Admin/import/Regions`);
    const mockRegions: Region[] = [
      {
        id: 1,
        name: 'Format 1',
        inactive: true,
      },
      {
        id: 2,
        name: 'Format 2',
        inactive: false,
      },
      {
        id: 3,
        name: 'Format 2',
        inactive: true,
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockRegions);
  }
}
