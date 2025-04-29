import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/bike/bike.routing').then((m) => m.BikeRoutes),
  },
];
