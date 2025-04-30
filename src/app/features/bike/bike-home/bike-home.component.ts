import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BikeSearchComponent } from '../bike-search/bike-search.component';
import { BikeListComponent } from '../bike-list/bike-list.component';
import { BikeService } from '../service/bike.service';
import { BikeListItem } from '../../../core/model/bike';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bike-home',
  imports: [BikeSearchComponent, BikeListComponent, CommonModule],
  templateUrl: './bike-home.component.html',
  styleUrl: './bike-home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeHomeComponent {
  bikeList$: Observable<BikeListItem[]>;
  constructor(private bikeService: BikeService) {
    this.bikeList$ = this.bikeService.getBikesList();
  }

  onSearch(query: string) {
    this.bikeService.getBikesByLocation(query);
  }
}
