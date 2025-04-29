import { Component } from '@angular/core';
import { BikeSearchComponent } from '../bike-search/bike-search.component';
import { BikeListComponent } from '../bike-list/bike-list.component';

@Component({
  selector: 'app-bike-home',
  imports: [BikeSearchComponent, BikeListComponent],
  templateUrl: './bike-home.component.html',
  styleUrl: './bike-home.component.scss',
  standalone: true,
})
export class BikeHomeComponent {}
