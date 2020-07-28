import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { ActivatedRoute } from '@angular/router';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { QuizService } from 'src/app/services/quiz.service';
=======
>>>>>>> 7f8e28bb9b219ec3c95ff81dd29f52aebe238f4c

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.page.html',
  styleUrls: ['./edit-question.page.scss'],
})
export class EditQuestionPage implements OnInit {

<<<<<<< HEAD
  
    question;
    puzzle;
    order: number;
    answer;
    option2;
    option3;
    option4;
    puzzles;

    urlParam = this.activRouter.snapshot.paramMap.get('question');

    constructor(private puzzleService: PuzzleService,
              private activRouter: ActivatedRoute,
              private quizService: QuizService) { }

   ngOnInit() {
    this.quizService.getQuestion(this.urlParam).forEach(ls =>
      ls.forEach( e => {
        this.question = e.question;
        this.puzzle = e.puzzle;
        this.order = e.order;
        this.answer = e.answer;
        this.option2 = e.options[0];
        this.option3 = e.options[1];
        this.option4 = e.options[2];
      })
    );
    this.puzzleService.getAllPuzzles().forEach(element => {
      this.puzzles = element;
    });
    console.log(this.puzzles)
  }

save() {
    var options = new Array();
    options.push(this.option2);
    options.push(this.option3);
    options.push(this.option4);
    const loc = {
        question: this.question,
        puzzle: this.puzzle,
        order: this.order,
        answer: this.answer,
        options: options
    };

    if (this.urlParam === 'new') {
      this.quizService.setQuestion(loc);
     } else {
      this.quizService.updateQuestion(this.urlParam, loc);
     }
  }
=======
  constructor() { }

  ngOnInit() {
  }

>>>>>>> 7f8e28bb9b219ec3c95ff81dd29f52aebe238f4c
}
