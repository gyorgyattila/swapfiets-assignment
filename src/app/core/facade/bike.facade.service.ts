import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Bike, BikeSearchParams } from '../model/bike';
import { GetBikeDto, SearchBikesDto } from '../dto/search-bike.dto';
import { BikeCountDTO } from '../dto/bike-count.dto';
import { AppConstants } from '../configuration/app.constants';
import { HttpErrorHandlerService } from './http-error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class BikeFacadeService extends HttpErrorHandlerService {
  private API_URL = 'https://bikeindex.org:443/api/v3';
  private httpClient = inject(HttpClient);
  private stoleness = AppConstants.STOLENESS;
  private pageSize = AppConstants.PAGE_SIZE;
  constructor() {
    super();
  }

  /**
   * Retrieves a list of bikes based on the specified search parameters.
   *
   * @param searchParams - The parameters used to filter the bike search results.
   *   - `pageNumber`: The page number for pagination.
   *   - `location`: The location to search for bikes.
   */
  getBikesByLocation(searchParams: BikeSearchParams): Observable<Bike[]> {
    return this.httpClient
      .get<SearchBikesDto>(
        `${this.API_URL}/search?page=${searchParams.pageNumber}&per_page=${this.pageSize}&location=${searchParams.location}&distance=10&stolenness=${this.stoleness}`
      )
      .pipe(
        map((response) => response.bikes),
        catchError(this.handleError<Bike[]>('getBikesByLocation', []))
      );
  }

  /**
   * Retrieves a bike by its unique identifier.
   *
   * @param id - The unique identifier of the bike to retrieve.
   * @returns An `Observable` that emits the `Bike` object corresponding to the given ID.
   *          If an error occurs, it will handle the error and return a fallback `Bike` object.
   */
  getBikeById(id: number): Observable<Bike> {
    return this.httpClient.get<GetBikeDto>(`${this.API_URL}/bikes/${id}`).pipe(
      map((response) => response.bike),
      catchError(this.handleError<Bike>('getBikeById', {} as Bike))
    );
  }

  /**
   * Retrieves the count of bikes based on the provided search parameters.
   *
   * @param searchParams - The parameters used to filter the bike search.
   *   - `pageNumber`: The page number for pagination.
   *   - `location`: The location to search for bikes.
   */
  getBikesCount(searchParams: BikeSearchParams): Observable<number> {
    return this.httpClient
      .get<BikeCountDTO>(
        `${this.API_URL}/search/count?page=${searchParams.pageNumber}&per_page=${this.pageSize}&location=${searchParams.location}&distance=10&stolenness=${this.stoleness}`
      )
      .pipe(
        map((response) => response.proximity),
        catchError(this.handleError<number>('getBikesCount', 0))
      );
  }
}
