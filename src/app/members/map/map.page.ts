import { Component, OnInit } from '@angular/core';
import { MapsService } from 'src/app/services/maps.service';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationService } from 'src/app/services/location.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var google;

@Component({
    selector: 'app-map',
    templateUrl: './map.page.html',
    styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

    map: any;
    directionsRenderer = new google.maps.DirectionsRenderer();
  

    constructor(private mapService: MapsService,
        private geolocation: Geolocation,
        private menu: MenuController,
        private lct: LocationService,
        private activRouter: ActivatedRoute,
        private router: Router,
        private locationService: LocationService

    ) { }

    ngOnInit() {
        let first = true;
        this.menu.enable(true, 'custom');
        this.menu.open('custom');

        const mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.roadmap,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
            center: new google.maps.LatLng(-28.6604238, -56.005892)
        };


        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        this.map.mapTypes.set('styled_map', this.mapService.styledMapType);
        this.map.setMapTypeId('styled_map');

        this.lct.getAllLocation().subscribe(async res => {
            res.forEach(el => {
                const marker = new google.maps.Marker({
                    position: new google.maps.LatLng(el.location.latitude, el.location.longitude),
                    title: el.description,
                });
                this.lct.getImgUrlbyCategory(el.category).subscribe(icon => {
                    marker.setIcon(icon);
                });
                marker.addListener('click', () => {
                    this.router.navigate(['members/location-details', el.description])
                });
                marker.setMap(this.map);
                if (this.activRouter.snapshot.paramMap.get("loc") == el.description) {
                    //this.calcRoute(new google.maps.LatLng(el.location.latitude, el.location.longitude));
                    this.map.setCenter(new google.maps.LatLng(el.location.latitude, el.location.longitude))
                    first= false;

                }
            });
            const myloc = new google.maps.Marker({
                clickable: true,
                icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
                    new google.maps.Size(22, 22),
                    new google.maps.Point(0, 18),
                    new google.maps.Point(11, 11)),
                shadow: null,
                zIndex: 999,
                map: this.map
            });
            this.geolocation.watchPosition().subscribe(pos => {
                this.lct.me = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                myloc.setPosition(this.lct.me);
                if (first) {
                    this.map.setCenter(this.lct.me);
                    first = false;
                }
            });

            const puzzleButtomDiv = document.createElement('div');
            this.mapService.PuzzlesButtom(puzzleButtomDiv, this.map);
            this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(puzzleButtomDiv);

            const profileButtomDiv = document.createElement('div');
            this.mapService.ProfileButtom(profileButtomDiv, this.map);
            this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(profileButtomDiv);

            const cameraButtomDiv = document.createElement('div');
            this.mapService.CameraButtom(cameraButtomDiv, this.map)
            this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(cameraButtomDiv);

            const centerButtomDiv = document.createElement('div');
            this.mapService.CenterButtom(centerButtomDiv, this.map);
            centerButtomDiv.addEventListener('click', () => {
                this.map.setCenter(this.lct.me);
            });
            this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
                centerButtomDiv
            );
        });
    }



    calcRoute(destination) {
        let directionsService = new google.maps.DirectionsService();

        this.geolocation.getCurrentPosition().then(res => {
            this.map.unbindAll();
            const request = {
                travelMode: google.maps.TravelMode.WALKING,
                origin: new google.maps.LatLng(res.coords.latitude, res.coords.longitude),
                destination: destination,
                provideRouteAlternatives: true,
            };
            console.log(request);
            directionsService.route(request, (result, status) => {
                if (status == "OK") {
                    this.directionsRenderer.setDirections(result);
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            });
            this.directionsRenderer.setMap(this.map);
        })
    }


}
