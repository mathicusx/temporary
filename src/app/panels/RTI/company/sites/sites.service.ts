import { Injectable, OnDestroy } from '@angular/core';
import { filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SaveSite, SiteResponse } from 'src/app/models/company/site.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';
import { CompanyService } from '../company.service';

@Injectable({
  providedIn: 'root',
})
export class SitesService implements OnDestroy {
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

  getSites(): Observable<SiteResponse> {
    this.companyService.ensureCompanyId();
    return this.http.post<SiteResponse>(
      `${this.apiUrl}/Site/Company/${this.companyId}/Sites`,
      {}
    );
  }

  saveSite(site: SaveSite): Observable<SaveSite> {
    this.companyService.ensureCompanyId();
    const cleanedPayload = cleanPayload(site);
    if (cleanedPayload.id) {
      return this.http.put<SaveSite>(
        `${this.apiUrl}/Site/Company/${this.companyId}/Site/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveSite>(
        `${this.apiUrl}/Site/Company/${this.companyId}/Site/`,
        cleanedPayload
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
