import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.page.html',
  styleUrls: ['./puzzles.page.scss'],
})
export class PuzzlesPage implements OnInit {

  itens = new Array();

  constructor(private puzzleService: PuzzleService,
              private router: Router) { }

  ngOnInit() {
    this.getUserPuzzlesDetails();
  }

  getUserPuzzlesDetails() {
    const array = new Array();
    this.puzzleService.getUserPuzzle().subscribe( res => {
      res.forEach( up => {
       this.puzzleService.getPuzzleDetailsDoc((up as any).payload.doc.data().puzzle).snapshotChanges().subscribe(puzzle => {
         console.log('puzzle', puzzle.payload);
         array.push(puzzle.payload);
       });
      });
    });
  }

}
