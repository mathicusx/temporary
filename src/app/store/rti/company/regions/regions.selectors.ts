import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegionState } from './regions.reducer';

export const selectRegionsState = createFeatureSelector<RegionState>('regions');

export const selectRegions = createSelector(
  selectRegionsState,
  (state) => state.regions
);

export const selectLoadingRegions = createSelector(
  selectRegionsState,
  (state) => state.loadingRegions
);

export const selectRegionsError = createSelector(
  selectRegionsState,
  (state) => state.error
);
