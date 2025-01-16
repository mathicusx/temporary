import { createAction, props } from '@ngrx/store';

const GLOBALVARIABLES = ' Global Variables';

export const setGlobalLoader = createAction(
  `[Page] ${GLOBALVARIABLES} set global loader`,
  props<{ active: boolean }>()
);
