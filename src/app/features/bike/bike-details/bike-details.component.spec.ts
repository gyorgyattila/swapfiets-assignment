import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDetailsComponent } from './bike-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { BikeService } from '../service/bike.service';
import { BikeFacadeService } from '../../../core/facade/bike.facade.service';
class MockBikeFacadeService {
  getBikeById(id: string) {
    return of({ id, name: 'Mock Bike', status: 'available' });
  }
}

describe('BikeDetailsComponent', () => {
  let component: BikeDetailsComponent;
  let fixture: ComponentFixture<BikeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: of({ id: '123' }), // mock route params
              paramMap: {
                get: (key: string) => (key === 'id' ? '123' : null), // if using snapshot.paramMap.get()
              },
            },
          },
        },
        BikeService,
        { provide: BikeFacadeService, useClass: MockBikeFacadeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
