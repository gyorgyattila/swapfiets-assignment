import { Routes, RouterModule } from '@angular/router';
import { BikeSearchComponent } from './bike-search/bike-search.component';
import { BikeHomeComponent } from './bike-home/bike-home.component';
import { BikeDetailsComponent } from './bike-details/bike-details.component';

export const BikeRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bikes',
  },
  {
    path: 'bikes',
    component: BikeHomeComponent,
    children: [
      {
        path: ':id',
        component: BikeDetailsComponent,
      },
    ],
  },
];
