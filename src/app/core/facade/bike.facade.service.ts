import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Bike, BikeSearchParams } from '../model/bike';
import { GetBikeDto, SearchBikesDto } from '../dto/search-bike.dto';
import { BikeCountDTO } from '../dto/bike-count.dto';
import { AppConstants } from '../configuration/app.constants';

@Injectable({
  providedIn: 'root',
})
export class BikeFacadeService {
  private API_URL = 'https://bikeindex.org:443/api/v3';
  private httpClient = inject(HttpClient);
  private stoleness = AppConstants.STOLENESS;
  private pageSize = AppConstants.PAGE_SIZE;
  constructor() {}

  getBikesByLocation(searchParams: BikeSearchParams): Observable<Bike[]> {
    return this.httpClient
      .get<SearchBikesDto>(
        `${this.API_URL}/search?page=${searchParams.pageNumber}&per_page=${this.pageSize}&location=${searchParams.location}&distance=10&stolenness=${this.stoleness}`
      )
      .pipe(map((response) => response.bikes));
  }

  getBikeById(id: number): Observable<Bike> {
    return this.httpClient
      .get<GetBikeDto>(`${this.API_URL}/bikes/${id}`)
      .pipe(map((response) => response.bike));
  }

  getBikesCount(searchParams: BikeSearchParams): Observable<number> {
    return this.httpClient
      .get<BikeCountDTO>(
        `${this.API_URL}/search/count?page=${searchParams.pageNumber}&per_page=${this.pageSize}&location=${searchParams.location}&distance=10&stolenness=${this.stoleness}`
      )
      .pipe(map((response) => response.proximity));
  }
}
