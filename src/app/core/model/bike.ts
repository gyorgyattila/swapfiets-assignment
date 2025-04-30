export interface Bike {
  date_stolen: number;
  description: string | null;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string;
  location_found: string | null;
  manufacturer_name: string;
  external_id: string | null;
  registry_name: string | null;
  registry_url: string | null;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: [number, number];
  stolen_location: string;
  thumb: string;
  title: string;
  url: string;
  year: number;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}

export interface BikeListItem {
  date_stolen: number | null;
  frame_colors: string[];
  id: number;
  large_img: string | null;
  serial: string | null;
  status: string;
  stolen: boolean;
  stolen_location: string | null;
  title: string;
}

export class BikeListResult {
  bikeList: BikeListItem[];
  currentPage: number = 1;
  maxCount: number = 0;

  constructor(bikeList: BikeListItem[], currentPage: number, maxCount: number) {
    this.bikeList = bikeList;
    this.currentPage = currentPage;
    this.maxCount = maxCount;
  }
}

export interface BikeSearchParams {
  location: string;
  pageNumber: number;
}

export enum BikeStatus {
  STOLEN = 'stolen',
  FOUND = 'found',
}

export const bikeStatusClassMap: Record<string, string> = {
  [BikeStatus.STOLEN]: 'bg-danger',
  [BikeStatus.FOUND]: 'bg-success',
};
