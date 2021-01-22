import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { AlertaService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-formiga',
  templateUrl: './formiga.page.html',
  styleUrls: ['./formiga.page.scss'],
})
export class FormigaPage implements OnInit {

  constructor(private route: Router, private puzzle: PuzzleService, private alert: AlertaService) { }

  ngOnInit() {
  }

  goToPuzzles(){
      this.alert.alert('Você desbloqueou o puzzle sobre Getulio Vargas!')
      this.route.navigate(['members/puzzles'])
  }

}
