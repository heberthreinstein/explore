import { Component, OnInit } from '@angular/core';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { ActivatedRoute } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.page.html',
  styleUrls: ['./location-details.page.scss'],
})
export class LocationDetailsPage implements OnInit {

  description = this.activRouter.snapshot.paramMap.get('description');
  information
  img1;
  img2;
  img3;
  constructor(
      private puzzleService: PuzzleService,
      private activRouter: ActivatedRoute,
      private locationService: LocationService


  ) { }

 ngOnInit() {
      this.locationService.getLocationInformation(this.description).subscribe(res => {
        this.information = res[0].information;  
        console.log(res)
      })
      this.img1 = this.locationService.getImgUrlbyLocation(this.description, 1);
      this.img2 = this.locationService.getImgUrlbyLocation(this.description, 2);
      this.img3 = this.locationService.getImgUrlbyLocation(this.description, 3);

   }

  discoverLocation(){
      this.puzzleService.setUserPuzzle(this.description)
  }

}
