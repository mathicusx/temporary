export interface NiRatesResponse {
  status: string;
  NiRates: NiRate[];
}

export interface NiRate {
  id: number;
  dateFrom: string;
  dateTo: string | null;
  employerRate: number;
  niFreeAmount: number;
  niFreeAmountU21: number;
  apprenticeLevy: number;
  pensionContributionRate: number;
}

export interface SaveNiRate {
  id?: number;
  date_from: string;
  date_to?: string | null;
  employer_rate: string;
  ni_free_amount: string;
  ni_free_amount_u21: string;
  apprentice_levy: string;
  pension_contribution_rate: string;
}
