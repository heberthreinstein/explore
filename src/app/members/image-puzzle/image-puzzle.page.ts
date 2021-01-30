import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertaService } from 'src/app/services/alert.service';

@Component({
    selector: 'app-image-puzzle',
    templateUrl: './image-puzzle.page.html',
    styleUrls: ['./image-puzzle.page.scss'],
})
export class ImagePuzzlePage implements OnInit {

    points = 10;
    title: any = "";
    options = new Array();
    loading;
    puzzle;
    img1: any;
    img2: any;
    img3: any;
    unlock2 = false
    unlock3 = false
    imgOpens = 0
    mistakes = 0
    answer;

    constructor(
        private puzzleService: PuzzleService,
        private activRouter: ActivatedRoute,
        private alert: AlertaService,
        private router: Router
    ) { }

    async ngOnInit() {
        const loading = await this.alert.loading()

        this.puzzle = this.activRouter.snapshot.paramMap.get("puzzle");
        this.title = this.activRouter.snapshot.paramMap.get("title");

        
        this.puzzleService.getImagePuzzle(this.title).subscribe((res: any) => {
            console.log(res)
            this.options = res[0].options
            this.options.push(res[0].answer);
            this.answer = res[0].answer;
            this.shuffleOptions();
        })
        
        this.puzzleService.getImgUrlbyImagePuzzle(this.title, 1).subscribe(res => {
            this.img1 = res
            loading.dismiss()
        })
        this.alert.alert("Utilize as imagens para descobrir com o que elas estão relacionadas<br>Caso não consiga descobrir de primeira, abra outras imagens, elas custam menos pontos que uma tentativa errada.")
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

    async unlock2img() {
        const loading = await this.alert.loading()
        this.unlock2 = true
        this.puzzleService.getImgUrlbyImagePuzzle(this.title, 2).subscribe(res => {
            this.img2 = res
            loading.dismiss()
        })
        this.imgOpens++
        this.calcPoints()
    }
    async unlock3img() {
        const loading = await this.alert.loading()
        this.unlock3 = true
        this.puzzleService.getImgUrlbyImagePuzzle(this.title, 3).subscribe(res => {
            this.img3 = res
            loading.dismiss()
        })
        this.imgOpens++
        this.calcPoints()
    }

    verifyAnswer(answer) {
        if (answer == this.answer) {
            this.alert.alert("Resposta Correta!<br>Você ganhou "+this.points+" pontos.")
            this.puzzleService.setNextStage(this.puzzle, this.points);
            this.router.navigate(['members/puzzles'])
        } else {
            this.alert.alert("Resposta Incorreta")
            this.mistakes++
            this.calcPoints()
        }
    }

    calcPoints() {
        switch (this.imgOpens) {
            case 0:
                switch (this.mistakes) {
                    case 1:
                        this.points = 8
                        break;
                    case 2:
                        this.points = 4
                        break;
                    case 3:
                        this.points = 0
                        break;
                    default:
                        break;
                }
                break;
            case 1:
                switch (this.mistakes) {
                    case 0:
                        this.points = 8
                        break;
                    case 1:
                        this.points = 6
                        break;
                    case 2:
                        this.points = 3
                        break;
                    case 3:
                        this.points = 0
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                switch (this.mistakes) {
                    case 0:
                        this.points = 6
                        break;
                    case 1:
                        this.points = 4
                        break;
                    case 2:
                        this.points = 2
                        break;
                    case 3:
                        this.points = 0
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

}
