import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.page.html',
  styleUrls: ['./edit-question.page.scss'],
})
export class EditQuestionPage implements OnInit {
  
    question;
    order: number;
    answer;
    option2;
    option3;
    option4;

    urlParam = this.activRouter.snapshot.paramMap.get('question');

    quiz = this.activRouter.snapshot.paramMap.get('quiz');

    constructor(private activRouter: ActivatedRoute,
              private quizService: QuizService) { }

   ngOnInit() {
    this.quizService.getQuestion(this.urlParam).forEach(ls =>
      ls.forEach( e => {
        this.question = e.question;
        this.quiz = e.quiz;
        this.order = e.order;
        this.answer = e.answer;
        this.option2 = e.options[0];
        this.option3 = e.options[1];
        this.option4 = e.options[2];
      })
    );
  }

save() {
    var options = new Array();
    options.push(this.option2);
    options.push(this.option3);
    options.push(this.option4);
    const loc = {
        question: this.question,
        quiz: this.quiz,
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

}
