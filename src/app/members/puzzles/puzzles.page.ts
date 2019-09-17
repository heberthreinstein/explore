import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-puzzles',
  templateUrl: './puzzles.page.html',
  styleUrls: ['./puzzles.page.scss'],
})
export class PuzzlesPage implements OnInit {

  itens: any;

  constructor(private puzzleService: PuzzleService,
              private router: Router) { }

  ngOnInit() {
    this.itens = this.puzzleService.getUsersPuzzles();
  }
  /**
   * Open the puzzleDetails page and send by URL the title of the puzzle
   * @param title Title of puzzle
   */
  itemDetails(title) {
    this.router.navigateByUrl('prot-list-stages');
  }
  protDate() {
    this.router.navigateByUrl('prot-date-puzzle');
  }

}
