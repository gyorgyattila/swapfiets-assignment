import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BikeListItem, bikeStatusClassMap } from '../../../core/model/bike';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bike-list',
  imports: [CommonModule],
  templateUrl: './bike-list.component.html',
  styleUrl: './bike-list.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeListComponent {
  @Input() bikeList: BikeListItem[] = [];
  bikeStatusClassMap = bikeStatusClassMap;

  constructor(private router: Router) {}

  navigateToBikeDetails(id: number) {
    this.router.navigate([`/bikes/${id}`]);
  }
}
