import { createReducer, on } from '@ngrx/store';
import {
  loadRegions,
  loadRegionsFailure,
  loadRegionsSuccess,
} from './regions.actions';
import { Region } from 'src/app/models/company/region.model';

export interface RegionState {
  regions: Region[];
  loadingRegions: boolean;
  error: string | null;
}

export const initialRegionState: RegionState = {
  regions: [],
  loadingRegions: false,
  error: null,
};

export const RegionsReducer = createReducer(
  initialRegionState,
  on(loadRegions, (state) => ({
    ...state,
    loadingRegions: true,
  })),
  on(loadRegionsSuccess, (state, { regions }) => ({
    ...state,
    regions,
    loadingRegions: false,
  })),
  on(loadRegionsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingRegions: false,
  }))
);
