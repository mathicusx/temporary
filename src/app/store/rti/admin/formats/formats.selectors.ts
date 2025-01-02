import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FormatState } from './formats.reducer';

export const selectFormatsState = createFeatureSelector<FormatState>('formats');

export const selectFormats = createSelector(
  selectFormatsState,
  (state) => state.formats
);

export const selectLoadingFormats = createSelector(
  selectFormatsState,
  (state) => state.loadingFormats
);

export const selectFormatsError = createSelector(
  selectFormatsState,
  (state) => state.error
);
