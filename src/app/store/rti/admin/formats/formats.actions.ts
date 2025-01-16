import { createAction, props } from '@ngrx/store';
import {
  ImportFormat,
  ImportFormatsResponse,
  SaveFormat,
} from 'src/app/models/admin/formats.model';

const FORMATS = 'FORMATS';

export const loadFormats = createAction(`[Page ${FORMATS}] Get Formats`);
export const loadFormatsSuccess = createAction(
  `[Service ${FORMATS}] Get Formats Success`,
  props<{ formats: ImportFormat[] }>()
);
export const loadFormatsFailure = createAction(
  `[Service ${FORMATS}] Get Formats Failed`,
  props<{ error: string }>()
);

export const saveFormat = createAction(
  `[Page ${FORMATS}] Save Format`,
  props<{ format: SaveFormat }>()
);
export const saveFormatSuccess = createAction(
  `[Page ${FORMATS}] Save Format Success`,
  props<{ format: SaveFormat }>()
);
export const saveFormatFailure = createAction(
  `[Page ${FORMATS}] Save Format Failure`,
  props<{ error: string }>()
);
