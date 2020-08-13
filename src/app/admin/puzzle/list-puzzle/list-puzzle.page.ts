import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleService } from 'src/app/services/puzzle.service';

@Component({
  selector: 'app-list-puzzle',
  templateUrl: './list-puzzle.page.html',
  styleUrls: ['./list-puzzle.page.scss'],
})
export class ListPuzzlePage implements OnInit {

  constructor(
    private router: Router,
    private puzzleService: PuzzleService
  ) { }

  itens;

  ngOnInit() {
    this.itens = this.puzzleService.getAllPuzzles();
  }

  editPage() {
    this.router.navigate(['admin/edit-puzzle', 'new']);
  }
  editItem(puzzle) {
    this.router.navigate(['admin/edit-puzzle', puzzle]);
  }
  deleteItem(puzzle) {
    this.puzzleService.deletePuzzle(puzzle);
  }

}
