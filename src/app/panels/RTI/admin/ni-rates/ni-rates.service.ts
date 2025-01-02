import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NiRate } from 'src/app/models/admin/niRates.model';

@Injectable({
  providedIn: 'root',
})
export class NiRatesService {
  private apiUrl = `${environment.apiURL}/v1`;

  constructor(private http: HttpClient) {}

  getNiRates(): Observable<NiRate[]> {
    // console.log(this.apiUrl);
    // return this.http.get<NiRate[]>(`${this.apiUrl}/Admib/NiRates`);
    const mockNiRates: NiRate[] = [
      {
        id: 1,
        dateFrom: '2021-04-01T00:00:00Z',
        dateTo: null,
        employerRate: 13.8,
        niFreeAmount: 121.0,
        niFreeAmountU21: 920.0,
        apprenticeLevy: 0.2,
        pensionContributionRate: 3.0,
      },
      {
        id: 2,
        dateFrom: '2022-01-01T00:00:00Z',
        dateTo: '2022-12-31T23:59:59Z',
        employerRate: 14.0,
        niFreeAmount: 130.0,
        niFreeAmountU21: 950.0,
        apprenticeLevy: 0.25,
        pensionContributionRate: 3.2,
      },
      {
        id: 3,
        dateFrom: '2023-01-01T00:00:00Z',
        dateTo: null,
        employerRate: 14.5,
        niFreeAmount: 140.0,
        niFreeAmountU21: 1000.0,
        apprenticeLevy: 0.3,
        pensionContributionRate: 3.5,
      },
    ];

    // Simulating an HTTP request by returning an observable with mock data
    return of(mockNiRates);
  }
}
