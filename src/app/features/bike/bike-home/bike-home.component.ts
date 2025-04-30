import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BikeSearchComponent } from '../bike-search/bike-search.component';
import { BikeListComponent } from '../bike-list/bike-list.component';
import { BikeService } from '../service/bike.service';
import { BikeListResult, BikeSearchParams } from '../../../core/model/bike';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AppConstants } from '../../../core/configuration/app.constants';

@Component({
  selector: 'app-bike-home',
  imports: [
    BikeSearchComponent,
    BikeListComponent,
    CommonModule,
    NgbPaginationModule,
  ],
  templateUrl: './bike-home.component.html',
  styleUrl: './bike-home.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BikeHomeComponent {
  bikeSearchParams: BikeSearchParams = {
    location: '',
    pageNumber: 1,
  };

  pageSize = AppConstants.PAGE_SIZE;
  bikeListResult$: Observable<BikeListResult>;
  loading$: Observable<boolean>;
  constructor(private bikeService: BikeService) {
    this.loading$ = this.bikeService.getLoading();
    this.bikeListResult$ = this.bikeService.getBikesListResult();
  }

  onSearch(query: string) {
    this.bikeSearchParams.location = query;
    this.bikeService.fetchBikeListResult(this.bikeSearchParams);
  }

  changePage(pageNumber: number) {
    this.bikeSearchParams.pageNumber = pageNumber;
    this.bikeService.fetchBikeListResult(this.bikeSearchParams);
  }
}
