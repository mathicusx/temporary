import { Injectable, OnDestroy } from '@angular/core';
import { filter, Observable, of, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  Role,
  RoleResponse,
  SaveRole,
} from 'src/app/models/company/role.model';
import { cleanPayload } from 'src/app/_helpers/clean-payload';
import { CompanyService } from '../company.service';

@Injectable({
  providedIn: 'root',
})
export class RolesService implements OnDestroy {
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

  getRoles(): Observable<RoleResponse> {
    this.companyService.ensureCompanyId();
    return this.http.post<RoleResponse>(
      `${this.apiUrl}/Company/${this.companyId}/Roles`,
      {}
    );
  }

  saveRole(role: SaveRole): Observable<SaveRole> {
    this.companyService.ensureCompanyId();
    const cleanedPayload = cleanPayload(role);
    if (cleanedPayload.id) {
      return this.http.put<SaveRole>(
        `${this.apiUrl}/Company/${this.companyId}/Role/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveRole>(
        `${this.apiUrl}/Company/${this.companyId}/Role/`,
        cleanedPayload
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
