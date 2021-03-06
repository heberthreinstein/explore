import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {    path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: './members/member-routing.module#MemberRoutingModule'
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: './admin/admin-routing.module#AdminRoutingModule'
  },
  // { path: 'edit-location/:location', loadChildren: './admin/location/edit-location/edit-location.module#EditLocationPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  // { path: 'list-location', loadChildren: './admin/location/list-location/list-location.module#ListLocationPageModule' },
  { path: 'prot-date-puzzle', loadChildren: './pages/prot-date-puzzle/prot-date-puzzle.module#ProtDatePuzzlePageModule' },
  { path: 'prot-list-stages', loadChildren: './pages/prot-list-stages/prot-list-stages.module#ProtListStagesPageModule' },
  { path: 'sample-ar-js', loadChildren: './ar/sample-ar-js/sample-ar-js.module#SampleArJsPageModule' },
  { path: 'prot-galery', loadChildren: './pages/prot-galery/prot-galery.module#ProtGaleryPageModule' },
  { path: 'prot-directions', loadChildren: './pages/prot-directions/prot-directions.module#ProtDirectionsPageModule' },
  { path: 'prot-details', loadChildren: './pages/prot-details/prot-details.module#ProtDetailsPageModule' },
  { path: 'teste', loadChildren: './pages/teste/teste.module#TestePageModule' },
  { path: 'forget-password', loadChildren: './pages/forget-password/forget-password.module#ForgetPasswordPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
