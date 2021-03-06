import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import { AlertaService } from 'src/app/services/alert.service';
import { shareReplay } from 'rxjs/operators';
import { leftJoin } from 'src/app/collectionJoin';

@Component({
    selector: 'app-location-details',
    templateUrl: './location-details.page.html',
    styleUrls: ['./location-details.page.scss'],
})
export class LocationDetailsPage implements OnInit {

    description = this.activRouter.snapshot.paramMap.get('description');
    information
    category
    img1;
    img2;
    img3;
    puzzles;
    ld;
    lat;
    lng;
    isDiscovered = false;
    unlocked = false;
    constructor(
        private puzzleService: PuzzleService,
        private activRouter: ActivatedRoute,
        private locationService: LocationService,
        private alert: AlertaService,
        private router: Router) { }

    async ngOnInit() {
        this.ld = await this.alert.loading();

        this.img1 = this.locationService.getImgUrlbyLocation(this.description, 1);
        this.img2 = this.locationService.getImgUrlbyLocation(this.description, 2);
        this.img3 = this.locationService.getImgUrlbyLocation(this.description, 3);

        this.locationService.getLocationInformation(this.description).subscribe(res => {
            this.information = res[0].information;
            this.category = res[0].category;
            this.lat = res[0].location.latitude
            this.lng = res[0].location.longitude
            this.locationService.getUserLocationByLocation(this.description).subscribe(async ul => {
                console.log('ul', ul)
                if (ul.length == 0) {
                    if (await this.locationService.isHere(this.lat, this.lng)) {
                        console.log('entoy')
                        this.discoverLocation().then(() => {
                            this.puzzleService.getPuzzleByTitle(this.description).subscribe(p => {
                                if (p.length > 0) {
                                    this.puzzleService.setUserPuzzle(this.description)
                                    this.puzzleService.setNextStage(this.description, 5)
                                    this.alert.alert('Seja Bem Vindo!<br>Você desbloqueou o desafio ' + this.description)
                                    this.unlocked = true;
                                }
                            })
                            this.getPuzzles();
                        })
                    } else {
                        this.getPuzzles()
                    }
                } else {
                    this.isDiscovered = true;
                    this.getPuzzles()

                }
                console.log(res)
            })
        })

    }

    async discoverLocation() {
        await this.locationService.setUserLocation(this.description)
        /** TODO: Verify if the location has his own puzzle */
        this.isDiscovered = true;
    }
    getPuzzles() {
        this.puzzleService.getPuzzlesByCategory(this.category).subscribe(ps => {
            this.puzzles = ps;
            this.puzzles.forEach(element => {
                this.puzzleService.getUserPuzzleByPuzzle(element.puzzle).subscribe(up => {
                    element.up = up[0]
                    console.log('uzzles', this.puzzles)
                    for (let index = 0; index < this.puzzles.length; index++) {
                        const element = this.puzzles[index];
                        console.log('element', element)
                        let keep = false;
                        for (let i = 0; i < element.stages.length; i++) {
                            const stage = element.stages[i];
                            if (stage.type == "Visite" && stage.title == this.description) {
                                keep = true;
                            }
                            if (stage.type == "Visite" && stage.title == this.description && element.up.nextStage == stage.order && this.isDiscovered && !this.unlocked) {
                                console.log('entrou')
                                this.puzzleService.setNextStage(element.up.puzzle, 5);
                                this.alert.alert('Seja Bem Vindo!<br><br>Você desbloqueou a proxima etapa do desafio ' + element.puzzle + ' e ganhou 5 pontos.')
                            }
                        }
                        if (!keep) {
                            this.puzzles.splice(index, 1);
                        }
                    }
                });
            });
        });
        this.ld.dismiss();
    }

    calculatePercentage(a, b) {
        return Math.round(Number(a - 1) / Number(b) * 100);
    }
    calculatePercentageDecimal(a, b) {
        return Number(a - 1) / Number(b);
    }
    arrived(puzzle) {
        this.alert.alert("Seja Bem Vindo <br> Você recebeu 5 pontos")
        this.puzzleService.setNextStage(puzzle, 5);
    }
    visite(puzzle) {
        this.router.navigate(['members/map/' + puzzle])
    }
    camera() {
        this.router.navigate(['members/ar'])
    }
}


