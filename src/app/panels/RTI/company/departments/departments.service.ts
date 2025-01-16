import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CompanyService } from '../company.service';
import { cleanPayload } from 'src/app/_helpers/clean-payload';
import {
  DepartmentResponse,
  SaveDepartment,
} from 'src/app/models/company/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsService implements OnDestroy {
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

  getDepartments(): Observable<DepartmentResponse> {
    this.companyService.ensureCompanyId();
    return this.http.post<DepartmentResponse>(
      `${this.apiUrl}/Company/${this.companyId}/Departments`,
      {}
    );
  }

  saveDepartment(department: SaveDepartment): Observable<SaveDepartment> {
    this.companyService.ensureCompanyId();
    const cleanedPayload = cleanPayload(department);
    if (cleanedPayload.id) {
      return this.http.put<SaveDepartment>(
        `${this.apiUrl}/Company/${this.companyId}/Department/${cleanedPayload.id}`,
        cleanedPayload
      );
    } else {
      return this.http.post<SaveDepartment>(
        `${this.apiUrl}/Company/${this.companyId}/Department/`,
        cleanedPayload
      );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
