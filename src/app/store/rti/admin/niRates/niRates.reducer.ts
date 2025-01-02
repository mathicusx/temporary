import { createReducer, on } from '@ngrx/store';

import { NiRate } from 'src/app/models/admin/niRates.model';
import {
  loadNiRates,
  loadNiRatesFailure,
  loadNiRatesSuccess,
} from './niRates.actions';

export interface NiRateState {
  niRates: NiRate[];
  loading: boolean;
  error: string | null;
}

export const initialNiRateState: NiRateState = {
  niRates: [],
  loading: false,
  error: null,
};

export const NiRatesReducer = createReducer(
  initialNiRateState,
  on(loadNiRates, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadNiRatesSuccess, (state, { niRates }) => ({
    ...state,
    niRates,
    loading: false,
  })),
  on(loadNiRatesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
