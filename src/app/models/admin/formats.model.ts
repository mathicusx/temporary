export interface ImportFormatsResponse {
  status: string;
  ImportFormats: ImportFormat[];
}
export interface ImportFormat {
  id: number;
  name: string;
  formatDetails: string;
}

export interface SaveFormat {
  id?: number;
  name: string;
  formatDetails: string;
}
