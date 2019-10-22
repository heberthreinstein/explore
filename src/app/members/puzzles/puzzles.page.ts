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
    this.getUserPuzzlesDetails();
  }

  getUserPuzzlesDetails() {
    this.puzzleService.getUserPuzzle().subscribe( res => {
      res.forEach( up => {
        this.puzzleService.getPuzzleDetailsDoc((up as any).payload.doc.data().puzzle).snapshotChanges().subscribe(puzzle  =>  {
          const ret = {
            puzzle : puzzle.payload,
            nextStage: this.puzzleService.getNextStage((up as any).payload.doc.id).then()
           };
          this.puzzles.push(ret);
        });
      });
    });
    console.log(this.puzzles);
  }
}
