import { createAction, props } from '@ngrx/store';
import { Import, SaveImport } from 'src/app/models/company/imports.model';

const IMPORTS = 'IMPORTS';

export const loadImports = createAction(`[Page ${IMPORTS}] Get Imports`);
export const loadImportsSuccess = createAction(
  `[Service ${IMPORTS}] Get Imports Success`,
  props<{ imports: Import[] }>()
);
export const loadImportsFailure = createAction(
  `[Service ${IMPORTS}] Get Imports Failed`,
  props<{ error: string }>()
);

export const saveImport = createAction(
  `[Page ${IMPORTS}] Save Import`,
  props<{ import: SaveImport }>()
);
export const saveImportSuccess = createAction(
  `[Page ${IMPORTS}] Save Import Success`,
  props<{ import: SaveImport }>()
);
export const saveImportFailure = createAction(
  `[Page ${IMPORTS}] Save Import Failure`,
  props<{ error: string }>()
);
