/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Bike.facadeService } from './bike.facade.service';

describe('Service: Bike.facade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Bike.facadeService]
    });
  });

  it('should ...', inject([Bike.facadeService], (service: Bike.facadeService) => {
    expect(service).toBeTruthy();
  }));
});
