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
