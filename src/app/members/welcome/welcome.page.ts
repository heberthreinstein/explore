import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleService } from 'src/app/services/puzzle.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private route: Router, private puzzle: PuzzleService) { }

  ngOnInit() {
     
  }
  
  start(){
      this.puzzle.setUserPuzzle('Terra dos Presidentes')   
      this.route.navigate(['members/map/-28.659084/-56.001355'])
  }

}
