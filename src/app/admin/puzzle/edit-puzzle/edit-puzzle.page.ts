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
    stages = [];
    puzzleTypes = ['Quiz', 'Go To']
    urlParam = this.activRouter.snapshot.paramMap.get('puzzle');

    constructor(private puzzleService: PuzzleService,
              private activRouter: ActivatedRoute) { }

   ngOnInit() {
    this.puzzleService.getPuzzleByTitle(this.urlParam).forEach(ls =>
      ls.forEach( e => {
        this.description = e.description;
        this.title = e.title;
        this.stages = e.stages;
      })
    );
  }

save() {
    const loc = {
      description: this.description,
      title: this.title,
      stages: this.stages
    };

    if (this.urlParam === 'new') {
      this.puzzleService.setPuzzle(loc);
     } else {
      this.puzzleService.updatePuzzle(this.urlParam, loc);
     }
  }

addStage(){
    const s = {
        title: '',
        type: '',
        order: '0'
    }
    this.stages.push(s);
}

}
