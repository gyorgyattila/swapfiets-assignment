import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Bike } from '../model/bike';
import { GetBikeDto, SearchBikesDto } from '../dto/search-bike.dto';

@Injectable({
  providedIn: 'root',
})
export class BikeFacadeService {
  private API_URL = 'https://bikeindex.org:443/api/v3';
  private httpClient = inject(HttpClient);
  constructor() {}

  getBikesByLocation(location: string): Observable<Bike[]> {
    return this.httpClient
      .get<SearchBikesDto>(
        `${this.API_URL}/search?page=1&per_page=10&location=${location}&distance=10&stolenness=proximity`
      )
      .pipe(map((response) => response.bikes));
  }

  getBikeById(id: number): Observable<Bike> {
    return this.httpClient
      .get<GetBikeDto>(`${this.API_URL}/bikes/${id}`)
      .pipe(map((response) => response.bike));
  }
}
