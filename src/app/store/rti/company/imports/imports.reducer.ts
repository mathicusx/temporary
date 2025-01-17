import { createReducer, on } from '@ngrx/store';
import {
  loadImports,
  loadImportsFailure,
  loadImportsSuccess,
} from './imports.actions';
import { Import } from 'src/app/models/company/imports.model';

export interface ImportState {
  imports: Import[];
  loadingImports: boolean;
  error: string | null;
}

export const initialImportState: ImportState = {
  imports: [],
  loadingImports: false,
  error: null,
};

export const ImportsReducer = createReducer(
  initialImportState,
  on(loadImports, (state) => ({
    ...state,
    loadingImports: true,
  })),
  on(loadImportsSuccess, (state, { imports }) => ({
    ...state,
    imports,
    loadingImports: false,
  })),
  on(loadImportsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingImports: false,
  }))
);
