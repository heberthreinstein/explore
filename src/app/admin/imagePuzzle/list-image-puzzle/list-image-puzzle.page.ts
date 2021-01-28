import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-image-puzzle',
  templateUrl: './list-image-puzzle.page.html',
  styleUrls: ['./list-image-puzzle.page.scss'],
})
export class ListImagePuzzlePage implements OnInit {

  constructor(
    private router: Router,
    private puzzleService: PuzzleService
  ) { }

  itens;

  ngOnInit() {
    this.itens = this.puzzleService.getAllImagesPuzzles();
  }

  editPage() {
    this.router.navigate(['admin/edit-image-puzzle', 'new']);
  }
  editItem(title) {
    this.router.navigate(['admin/edit-image-puzzle', title]);
  }
  deleteItem(title) {
    this.puzzleService.deletePuzzle(title);
  }

}
