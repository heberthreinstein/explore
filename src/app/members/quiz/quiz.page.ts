import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { element } from 'protractor';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
})
export class QuizPage implements OnInit {

  location;
  quiz = new Array();
  question

  constructor(private activRouter: ActivatedRoute,
              private quizService: QuizService,
              private auth: AuthenticationService
     ) { }

   async ngOnInit() {
        this.location = this.activRouter.snapshot.paramMap.get('location');
        await this.quizService.getQuizByLocation(this.location).get().subscribe(res => {res.forEach(element => {
               this.quiz.push(element.data());
            }); 
        }); 
        this.getActualQuestion();
    }

    async getActualQuestion(){
        var lastQuestion;
        return await this.quizService.getUserLastQuestion(this.auth.getLogedUserInformations().uid, this.location).subscribe(res => { 
            console.log('res',res);
            if (res.length == 0) {
                this.getQuestion(0);
            } else {
                
            }
        });        

    }

    getQuestion(actualQuestion){
        this.question = this.quiz[actualQuestion];
    }
}
