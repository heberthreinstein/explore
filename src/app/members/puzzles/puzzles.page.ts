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
          this.puzzleService.getUserPuzzleHistory((up as any).payload.doc.id).subscribe( stages => {
            for (const item of stages) {
              if (!(item as any).payload.doc.data().done) {
                this.puzzleService.getPuzzleStageDocByOrder((item as any).payload.doc.data().stage).snapshotChanges().subscribe( s => {
                    console.log('s', s);
                    const ret = {
                    puzzle : puzzle.payload,
                    nextStage: s
                  };
                    this.puzzles.push(ret);
                });
                return;
              }
            }
          });
        });
      });
    });
    console.log(this.puzzles);
  }
}
