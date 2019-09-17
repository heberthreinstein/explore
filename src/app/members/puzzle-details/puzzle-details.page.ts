import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute } from '@angular/router';
import { PuzzlesPage } from '../puzzles/puzzles.page';

@Component({
  selector: 'app-puzzle-details',
  templateUrl: './puzzle-details.page.html',
  styleUrls: ['./puzzle-details.page.scss'],
})
export class PuzzleDetailsPage implements OnInit {

  itens;
  title;

  constructor(private puzzleService: PuzzleService,
              private activRouter: ActivatedRoute,
              private puzzlePage: PuzzlesPage) { }

  ngOnInit() {
    this.title = this.activRouter.snapshot.paramMap.get('title');
    this.itens = this.puzzlePage.itens;
  }
}
