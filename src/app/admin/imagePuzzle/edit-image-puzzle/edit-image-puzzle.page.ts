import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PuzzleService } from 'src/app/services/puzzle.service';

@Component({
    selector: 'app-edit-image-puzzle',
    templateUrl: './edit-image-puzzle.page.html',
    styleUrls: ['./edit-image-puzzle.page.scss'],
})
export class EditImagePuzzlePage implements OnInit {

    title;
    answer;
    option2;
    option3;
    option4;
    image1 : File;
    image2 : File;
    image3 : File;

    urlParam = this.activRouter.snapshot.paramMap.get('title');

    constructor(private activRouter: ActivatedRoute,
              private puzzleService: PuzzleService) { }

   ngOnInit() {
    this.puzzleService.getImagePuzzle(this.urlParam).forEach(ls =>
      ls.forEach( (e: any) => {
        this.title = e.title;
        this.answer = e.answer;
        this.option2 = e.options[0];
        this.option3 = e.options[1];
        this.option4 = e.options[2];
      })
    );
  }
  detectFile1(event) {
    this.image1 = event.target.files;
    console.log(this.image1)
  }
  detectFile2(event) {
    this.image2 = event.target.files;
    console.log(this.image2)
  }
  detectFile3(event) {
    this.image3 = event.target.files;
    console.log(this.image3)

  }

save() {
    
    if (this.image1) {
     this.puzzleService.saveImagePuzzleImg(this.image1[0], this.title, '1');
    }
     if (this.image2) {
      this.puzzleService.saveImagePuzzleImg(this.image2[0], this.title, '2');
    }
     if (this.image3) {
     this.puzzleService.saveImagePuzzleImg(this.image3[0], this.title, '3');
    }

    var options = new Array();
    options.push(this.option2);
    options.push(this.option3);
    options.push(this.option4);
    const loc = {
        title: this.title,
        answer: this.answer,
        options: options
    };

    if (this.urlParam === 'new') {
      this.puzzleService.setImagePuzzle(loc);
     } else {
      this.puzzleService.updateImagePuzzle(this.urlParam, loc);
     }
  }

}
