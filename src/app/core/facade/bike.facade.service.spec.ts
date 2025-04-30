/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BikeFacadeService } from './bike.facade.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Service: Bike.facade', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BikeFacadeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should ...', inject([BikeFacadeService], (service: BikeFacadeService) => {
    expect(service).toBeTruthy();
  }));
});
