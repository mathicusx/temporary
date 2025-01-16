import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Region, RegionResponse, SaveRegion } from 'src/app/models/company/region.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';

@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getRegions(): Observable<RegionResponse> {
    return this.http.post<RegionResponse>(
      `${this.apiUrl}/Company/Regions`,
      {}
    );
  }

  saveRegion(region: SaveRegion): Observable<SaveRegion> {
    const cleanedPayload = cleanPayload(region);
    if (cleanedPayload.id) {
      return this.http.put<SaveRegion>(
        `${this.apiUrl}/Company/Region/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveRegion>(
        `${this.apiUrl}/Company/Region/`,
        cleanedPayload
      );
    }
  }
}
