import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NiRateState } from './niRates.reducer';

export const selectNiRatesState = createFeatureSelector<NiRateState>('niRates');

export const selectNiRates = createSelector(
  selectNiRatesState,
  (state) => state.niRates
);

export const selectLoadingNiRates = createSelector(
  selectNiRatesState,
  (state) => state.loading
);

export const selectNiRatesError = createSelector(
  selectNiRatesState,
  (state) => state.error
);
