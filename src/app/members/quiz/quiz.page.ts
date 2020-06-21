import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  location;
  quiz = new Array();

  constructor(private activRouter: ActivatedRoute,
    private quizService: QuizService,
     ) { }

   ngOnInit() {
        this.location = this.activRouter.snapshot.paramMap.get('location');
        this.quizService.getQuizByLocation(this.location).get().subscribe(res => {res.forEach(element => {
                this.quiz.push(element);
            }); 
        });  
    }
}
