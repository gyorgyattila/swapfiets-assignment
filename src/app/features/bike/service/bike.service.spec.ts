/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BikeService } from './bike.service';
import { of } from 'rxjs';
import { BikeFacadeService } from '../../../core/facade/bike.facade.service';
import { Bike, BikeSearchParams } from '../../../core/model/bike';

class MockBikeFacadeService {
  getBikesByLocation(searchParams: BikeSearchParams) {
    return of([
      { id: 1, title: 'Bike A' },
      { id: 2, title: 'Bike B' },
    ]);
  }

  getBikesCount(searchParams: BikeSearchParams) {
    return of(3);
  }
}

describe('Service: Bike', () => {
  let bikeSearchParams: BikeSearchParams = {
    location: 'Amsterdam',
    pageNumber: 1,
  };
  let bikeService: BikeService;
  let bikeFacadeService: BikeFacadeService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BikeService,
        { provide: BikeFacadeService, useClass: MockBikeFacadeService },
      ],
    });
    bikeService = TestBed.inject(BikeService);
    bikeFacadeService = TestBed.inject(BikeFacadeService);
  });

  it('should ...', inject([BikeService], (service: BikeService) => {
    expect(service).toBeTruthy();
  }));

  it('getBikesCount returns the correct count number', () => {
    bikeService.getBikesCount(bikeSearchParams).subscribe((result) => {
      expect(result).toEqual(3);
    });
  });

  it('getBikeListItemsByLocation returns the correct length of BikeListItem array', () => {
    bikeService
      .getBikeListItemsByLocation(bikeSearchParams)
      .subscribe((result) => {
        expect(result.length).toEqual(2);
      });
  });

  it('getBikeListItemsByLocation returns the correct id of the first bike', () => {
    bikeService
      .getBikeListItemsByLocation(bikeSearchParams)
      .subscribe((result) => {
        expect(result[0].id).toEqual(1);
      });
  });

  it('getBikeListItemsByLocation returns the correct title of the first bike', () => {
    bikeService
      .getBikeListItemsByLocation(bikeSearchParams)
      .subscribe((result) => {
        expect(result[0].title).toEqual('Bike A');
      });
  });
});
