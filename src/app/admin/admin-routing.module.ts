import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'edit-location/:location', loadChildren: './location/edit-location/edit-location.module#EditLocationPageModule' },
  { path: 'location', loadChildren: './location/list-location/list-location.module#ListLocationPageModule' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
