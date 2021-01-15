import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
  { path: 'map/:loc', loadChildren: './map/map.module#MapPageModule' },
  { path: 'puzzles/:title', loadChildren: './puzzle-details/puzzle-details.module#PuzzleDetailsPageModule' },
  { path: 'puzzles', loadChildren: './puzzles/puzzles.module#PuzzlesPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'location-details/:description', loadChildren: './location-details/location-details.module#LocationDetailsPageModule' },
  { path: ':puzzle/Quiz/:quizName', loadChildren: './quiz/quiz.module#QuizPageModule' },
  { path: 'ar', loadChildren: './ar/ar.module#ArPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
