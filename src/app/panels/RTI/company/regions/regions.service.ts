import { Injectable, OnDestroy } from '@angular/core';
import { filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Region,
  RegionResponse,
  SaveRegion,
} from 'src/app/models/company/region.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';
import { CompanyService } from '../company.service';

@Injectable({
  providedIn: 'root',
})
export class RegionsService implements OnDestroy {
  private destroy$ = new Subject<void>();
  private apiUrl = `${environment.apiURL}/v1`;

  private companyId: number | null = null;

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) {
    this.companyService.company$
      .pipe(
        takeUntil(this.destroy$),
        filter((companyId) => companyId !== null)
      )
      .subscribe((companyId) => {
        this.companyId = companyId;
      });
  }

  getRegions(): Observable<RegionResponse> {
    this.companyService.ensureCompanyId();
    return this.http.post<RegionResponse>(
      `${this.apiUrl}/Company/${this.companyId}/Regions`,
      {}
    );
  }

  saveRegion(region: SaveRegion): Observable<SaveRegion> {
    this.companyService.ensureCompanyId();
    const cleanedPayload = cleanPayload(region);
    if (cleanedPayload.id) {
      return this.http.put<SaveRegion>(
        `${this.apiUrl}/Company/${this.companyId}/Region/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveRegion>(
        `${this.apiUrl}/Company/${this.companyId}/Region/`,
        cleanedPayload
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
