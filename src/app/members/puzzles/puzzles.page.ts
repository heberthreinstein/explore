import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { Router } from '@angular/router';
import { leftJoin, leftJoinDocument } from 'src/app/collectionJoin';
import { shareReplay } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertaService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
        private auth: AuthenticationService,
        private alert: AlertaService) {
        this.puzzles = this.afs
            .collection('user_puzzle', up => up.where('uid', '==', auth.afAuth.auth.currentUser.uid))
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
    visite(puzzle){
        this.router.navigate(['members/map/'+ puzzle])
    }
    calculatePercentageDecimal(a,b){
        return Number(a - 1) / Number(b);
    }
    calculatePercentage(a,b){
        return Math.round(Number(a - 1) / Number(b) * 100);
    }
    backToMap(){
        this.router.navigate(['members'])
    }
    camera(){
        this.router.navigate(['members/ar'])
    }
}
