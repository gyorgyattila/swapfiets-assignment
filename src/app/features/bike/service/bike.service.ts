import { inject, Injectable } from '@angular/core';
import { BikeFacadeService } from '../../../core/facade/bike.facade.service';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  take,
  tap,
} from 'rxjs';
import {
  Bike,
  BikeListItem,
  BikeListResult,
  BikeSearchParams,
} from '../../../core/model/bike';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  bikeFacadeService = inject(BikeFacadeService);

  private loading$ = new BehaviorSubject<boolean>(false);
  private bikeListResult$: BehaviorSubject<BikeListResult> =
    new BehaviorSubject<BikeListResult>(new BikeListResult([], 1, 0));

  constructor() {}

  private getBikeListItemsByLocation(
    bikeSearchParams: BikeSearchParams
  ): Observable<BikeListItem[]> {
    return this.bikeFacadeService.getBikesByLocation(bikeSearchParams).pipe(
      map((bikes) =>
        bikes.map(
          (bike) =>
            ({
              date_stolen: bike.date_stolen,
              frame_colors: bike.frame_colors,
              id: bike.id,
              large_img: bike.large_img,
              serial: bike.serial,
              status: bike.status,
              stolen: bike.stolen,
              stolen_location: bike.stolen_location,
              title: bike.title,
            } as BikeListItem)
        )
      ),
      take(1)
    );
  }

  getBikesListResult(): Observable<BikeListResult> {
    return this.bikeListResult$.asObservable();
  }

  getBikeById(id: number): Observable<Bike> {
    return this.bikeFacadeService.getBikeById(id);
  }

  getBikesCount(bikeSearchParams: BikeSearchParams): Observable<number> {
    return this.bikeFacadeService.getBikesCount(bikeSearchParams);
  }

  fetchBikeListResult(bikeSearchParams: BikeSearchParams): void {
    this.loading$.next(true);
    forkJoin({
      bikes: this.getBikeListItemsByLocation(bikeSearchParams),
      count: this.getBikesCount(bikeSearchParams),
    })
      .pipe(
        map(
          (result) =>
            new BikeListResult(
              result.bikes,
              bikeSearchParams.pageNumber,
              result.count
            )
        ),
        tap(() => {
          this.loading$.next(false);
        }),
        catchError((err) => {
          console.error('Error fetching bike list result:');
          return of(new BikeListResult([], 1, 0));
        })
      )
      .subscribe((bikeListResult) => {
        this.bikeListResult$.next(bikeListResult);
      });
  }

  getLoading(): Observable<boolean> {
    return this.loading$.asObservable();
  }
}
