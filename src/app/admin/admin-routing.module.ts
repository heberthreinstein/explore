import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
// import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'edit-location/:location', loadChildren: './location/edit-location/edit-location.module#EditLocationPageModule' },
  { path: 'location', loadChildren: './location/list-location/list-location.module#ListLocationPageModule' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'category', loadChildren: './category/list-category/list-category.module#ListCategoryPageModule' },
  { path: 'edit-category/:category', loadChildren: './category/edit-category/edit-category.module#EditCategoryPageModule' },
  { path: 'edit-question/:question', loadChildren: './question/edit-question/edit-question.module#EditQuestionPageModule' },
  { path: 'edit-puzzle/:puzzle', loadChildren: './puzzle/edit-puzzle/edit-puzzle.module#EditPuzzlePageModule' },
  { path: 'puzzle', loadChildren: './puzzle/list-puzzle/list-puzzle.module#ListPuzzlePageModule' },
  { path: 'question', loadChildren: './question/list-question/list-question.module#ListQuestionPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
