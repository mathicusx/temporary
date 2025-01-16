import { createReducer, createSelector, on } from '@ngrx/store';
import { setGlobalLoader } from './global-variables.actions';
import { AppState } from '../app.state';

export interface GlobalVariablesState {
  globalLoader: boolean;
  error: string;
  isLoading: boolean;
}

export const initialGlobalVariablesState: GlobalVariablesState = {
  globalLoader: false,
  error: null,
  isLoading: false,
};

export const globalVariablesReducers = createReducer(
  initialGlobalVariablesState,
  on(setGlobalLoader, (state, { active }) => ({
    ...state,
    globalLoader: active,
  }))
);

const featureSelector = (state: AppState) => state.globalVariables;

export const selectGlobalLoaderStatus = createSelector(
  featureSelector,
  (state) => state.globalLoader
);

export const selectError = createSelector(
  featureSelector,
  (state) => state.error
);

export const selectIsLoading = createSelector(
  featureSelector,
  (state) => state.isLoading
);
