import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'; 
// import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'edit-location/:location', loadChildren: './location/edit-location/edit-location.module#EditLocationPageModule' },
  { path: 'location', loadChildren: './location/list-location/list-location.module#ListLocationPageModule' },
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'category', loadChildren: './category/list-category/list-category.module#ListCategoryPageModule' },
  { path: 'edit-category/:category', loadChildren: './category/edit-category/edit-category.module#EditCategoryPageModule' },
  { path: 'edit-question/:quiz/:question', loadChildren: './question/edit-question/edit-question.module#EditQuestionPageModule' },
  { path: 'edit-puzzle/:puzzle', loadChildren: './puzzle/edit-puzzle/edit-puzzle.module#EditPuzzlePageModule' },
  { path: 'puzzle', loadChildren: './puzzle/list-puzzle/list-puzzle.module#ListPuzzlePageModule' },
  { path: 'question/:quiz', loadChildren: './question/list-question/list-question.module#ListQuestionPageModule' },
  { path: 'edit-quiz/:quiz', loadChildren: './quiz/edit-quiz/edit-quiz.module#EditQuizPageModule' },
  { path: 'quiz', loadChildren: './quiz/list-quiz/list-quiz.module#ListQuizPageModule' },
  { path: 'image-puzzle', loadChildren: './imagePuzzle/list-image-puzzle/list-image-puzzle.module#ListImagePuzzlePageModule' },
  { path: 'edit-image-puzzle/:title', loadChildren: './imagePuzzle/edit-image-puzzle/edit-image-puzzle.module#EditImagePuzzlePageModule' },
  { path: 'list-cupom', loadChildren: './cupom/list-cupom/list-cupom.module#ListCupomPageModule' },
  { path: 'edit-cupom/:cupom', loadChildren: './cupom/edit-cupom/edit-cupom.module#EditCupomPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
