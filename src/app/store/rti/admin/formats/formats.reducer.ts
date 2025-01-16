import { createReducer, on } from '@ngrx/store';
import { ImportFormat, SaveFormat } from 'src/app/models/admin/formats.model';
import {
  loadFormats,
  loadFormatsFailure,
  loadFormatsSuccess,
  saveFormat,
  saveFormatFailure,
  saveFormatSuccess,
} from './formats.actions';

export interface FormatState {
  formats: ImportFormat[];
  format: SaveFormat;
  loadingFormats: boolean;
  loadingFormat: boolean;
  error: string | null;
}

export const initialFormatState: FormatState = {
  formats: [],
  format: null,
  loadingFormats: false,
  loadingFormat: false,
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
  })),
  on(saveFormat, (state) => ({
    ...state,
    loadingFormat: true,
  })),
  on(saveFormatSuccess, (state, { format }) => ({
    ...state,
    format,
    loadingFormat: false,
  })),
  on(saveFormatFailure, (state, { error }) => ({
    ...state,
    error,
    loadingFormat: false,
  }))
);
