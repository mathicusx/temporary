import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companySource = new BehaviorSubject<number | null>(null);
  company$ = this.companySource.asObservable();

  constructor() {}

  // Method to update the company ID
  setCompany(companyId: number): void {
    this.companySource.next(companyId);
  }

  ensureCompanyId(): void {
    if (!this.companySource.value) {
      throw new Error('Company ID is not set.');
    }
  }
}
