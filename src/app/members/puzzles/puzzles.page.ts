import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { Router } from '@angular/router';
import { leftJoin, leftJoinDocument } from 'src/app/collectionJoin';
import { shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from 'src/app/services/alert.service';
@Component({
    selector: 'app-puzzles',
    templateUrl: './puzzles.page.html',
    styleUrls: ['./puzzles.page.scss'],
})
export class PuzzlesPage implements OnInit {

    userPosition = 0;
    puzzles;
    constructor(private puzzleService: PuzzleService,
        private router: Router,
        private afs: AngularFirestore,
        private alert: AlertaService) {
        this.puzzles = this.afs
            .collection('user_puzzle')
            .valueChanges()
            .pipe(
                leftJoin(afs, 'puzzle', 'puzzle'),
                shareReplay(1)
            );
    }

    ngOnInit() {}

    goToQuiz(puzzle) {
        this.router.navigateByUrl('members/quiz/' + puzzle);
    }
    arrived(puzzle){
        this.alert.alert("Seja Bem Vindo <br> Você recebeu 10 pontos")
        this.puzzleService.setNextStage(puzzle, 10);
    }
}
