import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  ImportFormat,
  ImportFormatsResponse,
  SaveFormat,
} from 'src/app/models/admin/formats.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';

@Injectable({
  providedIn: 'root',
})
export class FormatsService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getFormats(): Observable<ImportFormatsResponse> {
    return this.http.get<ImportFormatsResponse>(
      `${this.apiUrl}/Admin/ImportFormats`
    );
  }

  saveFormat(format: SaveFormat): Observable<SaveFormat> {
    const cleanedPayload = cleanPayload(format);
    if (cleanedPayload.id) {
      return this.http.put<SaveFormat>(
        `${this.apiUrl}/Admin/ImportFormat/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveFormat>(
        `${this.apiUrl}/Admin/ImportFormat/`,
        cleanedPayload
      );
    }
  }
}
