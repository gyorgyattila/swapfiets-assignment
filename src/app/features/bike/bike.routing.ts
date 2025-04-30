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
    loadComponent: () =>
      import('./bike-home/bike-home.component').then(
        (m) => m.BikeHomeComponent
      ),
  },
  {
    path: 'bikes/:id',
    loadComponent: () =>
      import('./bike-details/bike-details.component').then(
        (m) => m.BikeDetailsComponent
      ),
  },
  { path: '**', redirectTo: 'bikes' },
];
