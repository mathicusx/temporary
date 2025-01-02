import { createReducer, on } from '@ngrx/store';
import { Format } from 'src/app/models/admin/formats.model';
import { loadFormats, loadFormatsFailure, loadFormatsSuccess } from './formats.actions';

export interface FormatState {
  formats: Format[];
  loadingFormats: boolean;
  error: string | null;
}

export const initialFormatState: FormatState = {
  formats: [],
  loadingFormats: false,
  error: null,
};

export const FormatsReducer = createReducer(
  initialFormatState,
  on(loadFormats, (state) => ({
    ...state,
    loadingFormats: true,
  })),
  on(loadFormatsSuccess, (state, { formats }) => ({
    ...state,
    formats,
    loadingFormats: false,
  })),
  on(loadFormatsFailure, (state, { error }) => ({
    ...state,
    error,
    loadingFormats: false,
  }))
);
