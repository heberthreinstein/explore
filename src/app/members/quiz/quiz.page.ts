import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "src/app/services/quiz.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { element } from "protractor";
import { AlertaService } from "src/app/services/alert.service";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.page.html",
  styleUrls: ["./quiz.page.scss"],
})
export class QuizPage implements OnInit {
  puzzle;
  quiz = new Array();
  question: any = "";
  options = new Array();
  loading;

  constructor(
    private activRouter: ActivatedRoute,
    private quizService: QuizService,
    private auth: AuthenticationService,
    private alert: AlertaService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.loading = await this.alert.loading();
    this.puzzle = this.activRouter.snapshot.paramMap.get("puzzle");
    this.quizService
      .getQuizByPuzzle(this.puzzle)
      .get()
      .subscribe((res) => {
        res.forEach((element) => {
          this.quiz.push(element.data());
        });
      });
    this.getActualQuestion();
  }

  getActualQuestion() {
    return this.quizService
      .getUserLastQuestion(
        this.auth.getLogedUserInformations().uid,
        this.puzzle
      )
      .subscribe((res: any) => {
        console.log("res", res);
        if (res.length == 0) {
          this.getQuestion(0);
        } else {
          const actualQuestion = res[0].order + 1;  
          console.log('acq', actualQuestion)
          this.getQuestion(actualQuestion);
        }
      });
  }

  getQuestion(actualQuestion) {
    console.log('quiz',this.quiz)
    //Verify if quiz completed
    if (this.quiz.length == actualQuestion) {
        this.alert.alert("Quiz Completed")
        this.router.navigate(['members/puzzles']);
        this.loading.dismiss();
    }

    this.quiz.forEach(element => {
        console.log('elemet', element)
        if (element.order == actualQuestion) {
            this.question = element;
        }
    });
    
    console.log('qst', this.question)
    if (!this.question) {
        console.log('buu')
    }
    this.options = this.question.options;
    this.options.push(this.question.answer);
    this.shuffleOptions();
    this.loading.dismiss();
  }

  shuffleOptions() {
    var currentIndex = this.options.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.options[currentIndex];
      this.options[currentIndex] = this.options[randomIndex];
      this.options[randomIndex] = temporaryValue;
    }
  }

  verifyAnswer(answer) {
    if (answer == this.question.answer) {
      if (this.question.order == 0) {
          this.quizService.setUserLastQuestion(this.auth.getLogedUserInformations().uid, this.question.puzzle ,this.question.order);
      } else {
          this.quizService.updateUserLastQuestion(this.auth.getLogedUserInformations().uid, this.question.puzzle ,this.question.order);   
      }
      this.alert.toast({message: "Resposta Correta!"});
    } else {
      this.alert.alert("Respota Incorreta");
    }
  }
}
