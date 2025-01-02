import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SiteState } from './sites.reducer';

export const selectSitesState = createFeatureSelector<SiteState>('sites');

export const selectSites = createSelector(
  selectSitesState,
  (state) => state.sites
);

export const selectLoadingSites = createSelector(
  selectSitesState,
  (state) => state.loadingSites
);

export const selectSitesError = createSelector(
  selectSitesState,
  (state) => state.error
);
