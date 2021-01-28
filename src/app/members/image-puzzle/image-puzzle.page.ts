import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-puzzle',
  templateUrl: './image-puzzle.page.html',
  styleUrls: ['./image-puzzle.page.scss'],
})
export class ImagePuzzlePage implements OnInit {
  
    points = 3;
    title: any = "";
    options = new Array();
    loading;
    puzzle;
    totalPoints = 0;

  constructor(
      private puzzleService: PuzzleService,
      private activRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.title = this.activRouter.snapshot.paramMap.get("title");
    this.puzzleService.getImagePuzzle(this.title).subscribe((res: any) => {
        console.log(res)
        this.options = res[0].options
        this.options.push(res[0].answer);
        this.shuffleOptions();
    })
    
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

}
