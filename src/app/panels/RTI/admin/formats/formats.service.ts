import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Format } from 'src/app/models/admin/formats.model';

@Injectable({
  providedIn: 'root',
})
export class FormatsService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getFormats(): Observable<Format[]> {
    // console.log(this.apiUrl);
    // return this.http.get<Format[]>(`${this.apiUrl}/Admin/import/formats`);
    const mockFormats: Format[] = [
      {
        id: 1,
        name: 'Format 1',
        formatDetails: 'Detail 1',
      },
      {
        id: 2,
        name: 'Format 2',
        formatDetails: 'Detail 2',
      },
      {
        id: 3,
        name: 'Format 2',
        formatDetails: 'Detail 2',
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockFormats);
  }
}
