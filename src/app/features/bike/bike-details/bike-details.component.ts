import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bike, bikeStatusClassMap } from '../../../core/model/bike';
import { BikeService } from '../service/bike.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bike-details',
  imports: [CommonModule],
  templateUrl: './bike-details.component.html',
  styleUrl: './bike-details.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeDetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private bikeService = inject(BikeService);

  bikeStatusClassMap = bikeStatusClassMap;
  bikeDetails = signal<Bike | null>(null);

  constructor() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.bikeService
      .getBikeById(id)
      .pipe(take(1))
      .subscribe((bike) => {
        this.bikeDetails.set(bike);
      });
  }
  ngOnInit(): void {}

  get bike() {
    return this.bikeDetails.asReadonly();
  }
}
