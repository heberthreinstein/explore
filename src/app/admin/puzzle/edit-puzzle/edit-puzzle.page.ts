import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-edit-puzzle',
  templateUrl: './edit-puzzle.page.html',
  styleUrls: ['./edit-puzzle.page.scss'],
})
export class EditPuzzlePage implements OnInit {

    puzzle;
    description;
    stages = [];
    puzzleTypes = ['Quiz', 'Go To']
    selectedType;
    urlParam = this.activRouter.snapshot.paramMap.get('puzzle');

    constructor(private puzzleService: PuzzleService,
                private quizService: QuizService,
                private locationService: LocationService,
              private activRouter: ActivatedRoute) { }

   ngOnInit() {
    this.puzzleService.getPuzzleByTitle(this.urlParam).forEach(ls =>
      ls.forEach( e => {
        this.description = e.description;
        this.puzzle = e.puzzle;
        this.stages = e.stages;
        for (let i = 0; i < this.stages.length; i++) {
            this.onChangeType(i);
        }
      })
    );
  }

save() {
    this.stages.forEach(element => {
        delete element.sts;
    });
    const loc = {
      description: this.description,
      puzzle: this.puzzle,
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
        type: '',
        order: '0'
    }
    this.stages.push(s);
}

onChangeType(i){
    if(this.stages[i].type == "Quiz"){
       this.quizService.getAllQuizes().subscribe(res => {
             this.stages[i].sts = res;
        });
    } else if (this.stages[i].type == "Go To"){
        this.locationService.getAllLocation().subscribe(res => {
            this.stages[i].sts = res;
        });
    }
}

}
