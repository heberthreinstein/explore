import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.page.html',
  styleUrls: ['./edit-quiz.page.scss'],
})
export class EditQuizPage implements OnInit {
  urlParam = this.activRouter.snapshot.paramMap.get('quiz');
  title;

  constructor(private quiz: QuizService,
              private activRouter: ActivatedRoute, ) { }

  ngOnInit() {
    this.quiz.getQuizByTitle(this.urlParam).forEach(cat =>
      cat.forEach( c => {
        this.title = c.title;
      })
    );
  }
  save() {
    if (this.urlParam === 'new') {
      this.quiz.setQuiz(this.title);
    } else {
      // edit Questions only
    }
  }
}
