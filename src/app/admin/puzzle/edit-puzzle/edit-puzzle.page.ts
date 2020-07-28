import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-puzzle',
  templateUrl: './edit-puzzle.page.html',
  styleUrls: ['./edit-puzzle.page.scss'],
})
export class EditPuzzlePage implements OnInit {

    title;
    description;
    urlParam = this.activRouter.snapshot.paramMap.get('puzzle');

    constructor(private puzzleService: PuzzleService,
              private activRouter: ActivatedRoute) { }

   ngOnInit() {
    this.puzzleService.getPuzzleByTitle(this.urlParam).forEach(ls =>
      ls.forEach( e => {
        this.description = e.description;
        this.title = e.title;
      })
    );
  }

save() {
    const loc = {
      description: this.description,
      title: this.title
    };

    if (this.urlParam === 'new') {
      this.puzzleService.setPuzzle(loc);
     } else {
      this.puzzleService.updatePuzzle(this.urlParam, loc);
     }
  }

}
