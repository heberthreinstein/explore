import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { Platform } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  map: any;

  constructor(private mapService: MapsService,
              private plt: Platform) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.map = new google.maps.Map(document.getElementById('map'), this.mapService.mapOptions);
      this.map.mapTypes.set('styled_map', this.mapService.styledMapType);
      this.map.setMapTypeId('styled_map');
    });
  }
}
