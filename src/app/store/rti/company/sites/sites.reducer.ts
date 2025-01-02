import { createReducer, on } from '@ngrx/store';
import { loadSites, loadSitesFailure, loadSitesSuccess } from './sites.actions';
import { Site } from 'src/app/models/company/site.model';

export interface SiteState {
  sites: Site[];
  loadingSites: boolean;
  error: string | null;
}

export const initialSiteState: SiteState = {
  sites: [],
  loadingSites: false,
  error: null,
};

export const SitesReducer = createReducer(
  initialSiteState,
  on(loadSites, (state) => ({
    ...state,
    loadingSites: true,
  })),
  on(loadSitesSuccess, (state, { sites }) => ({
    ...state,
    sites,
    loadingSites: false,
  })),
  on(loadSitesFailure, (state, { error }) => ({
    ...state,
    error,
    loadingSites: false,
  }))
);
