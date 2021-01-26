import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PuzzleService } from 'src/app/services/puzzle.service';
import { LocationService } from 'src/app/services/location.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user;
  achivments = new Array<{
      category,
      imgurl
  }>()
    totalTrofeus: number;
    points = 0;
    desafios = 0;

  constructor(private auth: AuthenticationService, private puzzleService: PuzzleService, private lct: LocationService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.user = this.auth.getLogedUserInformations();
    this.puzzleService.getLoggedUserAchivments().subscribe(acv => {
        this.totalTrofeus = acv.length
        acv.forEach((element: any) => {
           this.lct.getImgUrlbyCategory(element.category).subscribe(res => {
               this.achivments.push({category: element.category, imgurl: res});
           }) 
        });
    })

    this.puzzleService.getUserPuzzle().valueChanges().subscribe(res => {
        res.forEach((element: any) => {
            this.points += element.points
            if (element.completed) {
                this.desafios++;
            }
        });
    })
  }

  logout() {
    this.auth.logout();
  }

  getCategoryImg(category){
    return this.storage.ref('/categoryImg/' + category + '/icon_52x52').getDownloadURL().toPromise().then(res => {
        console.log(res)
        return res;
    });

  }

}
