import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.page.html',
  styleUrls: ['./puzzles.page.scss'],
})
export class PuzzlesPage implements OnInit {

  puzzles = new Array();
  constructor(private puzzleService: PuzzleService,
              private router: Router) { }

  ngOnInit() {
    this.getUserPuzzle();
  }
  getUserPuzzle() {
    this.puzzleService.getUserPuzzle().get().subscribe(querrySnapshot => {
      querrySnapshot.forEach( doc => {
        this.puzzles.push(doc.data());
        console.log('data', doc.data());
        this.puzzleService.getPuzzleByTitle(doc.data().puzzle).subscribe(res => console.log('res', res));
      });
    });
  }
}
