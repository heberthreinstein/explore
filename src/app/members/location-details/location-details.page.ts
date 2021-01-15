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
    ld;
    constructor(
        private puzzleService: PuzzleService,
        private activRouter: ActivatedRoute,
        private locationService: LocationService,
        private alert: AlertaService) {}

    async ngOnInit() {
        this.ld = await this.alert.loading();

        this.img1 = this.locationService.getImgUrlbyLocation(this.description, 1);
        this.img2 = this.locationService.getImgUrlbyLocation(this.description, 2);
        this.img3 = this.locationService.getImgUrlbyLocation(this.description, 3);
        
        this.locationService.getLocationInformation(this.description).subscribe(res => {
            this.information = res[0].information;
            this.category = res[0].category;
            this.locationService.getUserLocationByLocation(this.description).subscribe(async ul =>{
                console.log('ul', ul)
                if(ul.length == 0){
                    if(await this.locationService.isHere(res[0].location.latitude, res[0].location.longitude)){
                        console.log('entoy')
                        this.discoverLocation().then( () =>
                            this.getPuzzles()
                        )
                    }else{
                        this.getPuzzles()
                    }  
                }else{
                    this.getPuzzles()

                }                
            console.log(res)
        })
        })

    }

    async discoverLocation() {
        await this.locationService.setUserLocation(this.description)
        /** TODO: Verify if the location has his own puzzle */
        await this.puzzleService.setUserPuzzle(this.description)
    }
    getPuzzles(){
        this.puzzleService.getPuzzlesByCategory(this.category).subscribe(ps => {
        this.puzzles = ps;
        this.puzzles.forEach(element => {
            this.puzzleService.getUserPuzzleByPuzzle(element.puzzle).subscribe(up => element.up = up[0])
        });
        console.log('uzzles',this.puzzles)
        for (let index = 0; index < this.puzzles.length; index++) {
            const element = this.puzzles[index];
            let keep = false;
            for (let i = 0; i < element.stages.length; i++) {
                const stage = element.stages[i];
                if (stage.type == "Visite" && stage.title == this.description) {
                    keep = true;
                }
            }
            if (!keep) {
                this.puzzles.splice(index, 1);
            }
        }
        });
        this.ld.dismiss();
    }

    calculatePercentage(a,b){
        return Math.round(Number(a) / Number(b) * 100);
    }
    calculatePercentageDecimal(a,b){
        return Number(a) / Number(b);
    }
}


