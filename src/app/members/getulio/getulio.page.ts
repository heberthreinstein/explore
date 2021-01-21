import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { AlertaService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-getulio',
  templateUrl: './getulio.page.html',
  styleUrls: ['./getulio.page.scss'],
})
export class GetulioPage implements OnInit {

  constructor(private route: Router, private puzzle: PuzzleService, private alert: AlertaService) { }

  ngOnInit() {
      this.puzzle.setUserPuzzle('Getulio Vargas');  
  }

  goToPuzzles(){
      this.alert.alert('Você desbloqueou o puzzle sobre Getulio Vargas!')
      this.route.navigate(['members/puzzles'])
  }

}
