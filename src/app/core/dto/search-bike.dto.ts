import { Bike } from '../model/bike';

export interface SearchBikesDto {
  bikes: Bike[];
}

export interface GetBikeDto {
  bike: Bike;
}
