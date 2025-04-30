import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeHomeComponent } from './bike-home.component';
import { BikeService } from '../service/bike.service';
import { BikeFacadeService } from '../../../core/facade/bike.facade.service';

class MockBikeFacadeService {}

describe('BikeHomeComponent', () => {
  let component: BikeHomeComponent;
  let fixture: ComponentFixture<BikeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BikeHomeComponent],
      providers: [
        BikeService,
        { provide: BikeFacadeService, useClass: MockBikeFacadeService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BikeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
