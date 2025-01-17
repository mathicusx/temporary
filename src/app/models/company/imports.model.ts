import { ImportFormat } from '../admin/formats.model';

export interface Import {
  id: number;
  filePath: string;
  imported: boolean;
  site: {
    id: number;
    name: string;
  };
  uploadDatetime: string; // Use `Date` if you're parsing it as a Date object
  fileType: string;
  importedDateTime: string | null; // Use `Date` if you're parsing it as a Date object
  notes: string | null;
  agency: {
    id: number;
    name: string;
  };
  format?: ImportFormat;
  weekEnding?: string;
}

export interface ImportResponse {
  statuss: string;
  Imports: Import[];
}

export interface SaveImport {
  id?: number;
  notes?: string;
  site?: string;
  weekEnding?: string;
  agency: string;
  format: string;
}
