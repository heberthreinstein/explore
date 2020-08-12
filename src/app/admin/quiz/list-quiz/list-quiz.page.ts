import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.page.html',
  styleUrls: ['./list-quiz.page.scss'],
})
export class ListQuizPage implements OnInit {

  constructor(
    private router: Router,
    private quiz: QuizService
  ) { }

  itens;

  ngOnInit() {
    this.itens = this.quiz.getAllQuizes();
  }

  editPage() {
    this.router.navigate(['admin/edit-quiz', 'new']);
  }
  editItem(quiz) {
    this.router.navigate(['admin/question', quiz]);
  }
  deleteItem(description) {
    this.quiz.deleteQuiz(description);
  }

}
