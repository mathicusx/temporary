import { createAction, props } from '@ngrx/store';
import { Format } from 'src/app/models/admin/formats.model';

const FORMATS = 'FORMATS';

export const loadFormats = createAction(`[Page ${FORMATS}] Get Formats`);
export const loadFormatsSuccess = createAction(
  `[Service ${FORMATS}] Get Formats Success`,
  props<{ formats: Format[] }>()
);
export const loadFormatsFailure = createAction(
  `[Service ${FORMATS}] Get Formats Failed`,
  props<{ error: string }>()
);
