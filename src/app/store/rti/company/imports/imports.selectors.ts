import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ImportState } from './imports.reducer';

export const selectImportsState = createFeatureSelector<ImportState>('imports');

export const selectImports = createSelector(
  selectImportsState,
  (state) => state.imports
);

export const selectLoadingImports = createSelector(
  selectImportsState,
  (state) => state.loadingImports
);

export const selectImportsError = createSelector(
  selectImportsState,
  (state) => state.error
);
