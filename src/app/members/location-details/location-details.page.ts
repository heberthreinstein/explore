import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute } from '@angular/router';
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
    constructor(
        private puzzleService: PuzzleService,
        private activRouter: ActivatedRoute,
        private locationService: LocationService,
        private alert: AlertaService) {}

    async ngOnInit() {
        const ld = await this.alert.loading();
        this.locationService.getLocationInformation(this.description).subscribe(res => {
            this.information = res[0].information;
            this.category = res[0].category;
            console.log(res)

            this.puzzleService.getPuzzlesByCategory(this.category).subscribe(ps => {
                this.puzzles = ps;
                this.puzzles.forEach(element => {
                    this.puzzleService.getUserPuzzleByPuzzle(element.puzzle).subscribe(up => element.up = up[0])
                    ld.dismiss();
                });
                console.log(this.puzzles)
            })

        })
        this.img1 = this.locationService.getImgUrlbyLocation(this.description, 1);
        this.img2 = this.locationService.getImgUrlbyLocation(this.description, 2);
        this.img3 = this.locationService.getImgUrlbyLocation(this.description, 3);

    }

    discoverLocation() {
        this.puzzleService.setUserPuzzle(this.description)
    }
}
