import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-question',
  templateUrl: './list-question.page.html',
  styleUrls: ['./list-question.page.scss'],
})
export class ListQuestionPage implements OnInit {

  constructor(
    private router: Router,
    private quiz: QuizService
  ) { }

  itens;

  ngOnInit() {
    this.itens = this.quiz.getAllQuestions();
  }

  editPage() {
    this.router.navigate(['admin/edit-question', 'new']);
  }
  editItem(question) {
    this.router.navigate(['admin/edit-question', question]);
  }
  deleteItem(question) {
    this.quiz.deleteQuestion(question);
  }

}
