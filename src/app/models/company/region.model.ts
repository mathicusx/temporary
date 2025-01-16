export interface Region {
  id: number;
  name: string;
}

export interface RegionResponse {
  status: string;
  Regions: Region[];
}
export interface SaveRegion {
  id?: number;
  name: string;
}
