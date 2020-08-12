import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.page.html',
  styleUrls: ['./list-question.page.scss'],
})
export class ListQuestionPage implements OnInit {

  constructor(
    private router: Router,
    private quiz: QuizService,
    private activRouter: ActivatedRoute
  ) { }

  itens;
  urlParam = this.activRouter.snapshot.paramMap.get('quiz');

  ngOnInit() {
    this.itens = this.quiz.getQuestionsByQuiz(this.urlParam).valueChanges();
    console.log(this.itens);
  }

  editPage() {
    this.router.navigate(['admin/edit-question', this.urlParam, 'new']);
  }
  editItem(question) {
    this.router.navigate(['admin/edit-question', this.urlParam, question]);
  }
  deleteItem(question) {
    this.quiz.deleteQuestion(question);
  }

}
