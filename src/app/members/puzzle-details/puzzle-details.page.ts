import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puzzle-details',
  templateUrl: './puzzle-details.page.html',
  styleUrls: ['./puzzle-details.page.scss'],
})
export class PuzzleDetailsPage implements OnInit {

  puzzle;

  constructor(private puzzleService: PuzzleService,
              private activRouter: ActivatedRoute) { }

  ngOnInit() {
    this.puzzle = this.puzzleService.getPuzzleDetails(this.activRouter.snapshot.paramMap.get('title'));
  }
}
