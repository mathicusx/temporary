import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CompanyService } from '../company.service';
import { cleanPayload } from 'src/app/_helpers/clean-payload';
import {
  ImportResponse,
  SaveImport,
} from 'src/app/models/company/imports.model';

@Injectable({
  providedIn: 'root',
})
export class ImportsService implements OnDestroy {
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

  getImports(): Observable<ImportResponse> {
    this.companyService.ensureCompanyId();
    return this.http.get<ImportResponse>(
      `${this.apiUrl}/Company/${this.companyId}/Imports`
    );
  }

  saveImport(importData: SaveImport): Observable<SaveImport> {
    this.companyService.ensureCompanyId();
    const cleanedPayload = cleanPayload(importData);
    if (cleanedPayload.id) {
      return this.http.put<SaveImport>(
        `${this.apiUrl}/Company/${this.companyId}/Import/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveImport>(
        `${this.apiUrl}/Company/${this.companyId}/Import/`,
        cleanedPayload
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
