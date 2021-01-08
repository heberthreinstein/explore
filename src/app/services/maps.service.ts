import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google;

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  constructor(private router: Router,
              private geolocation: Geolocation
              ) {}

  styledMapType = new google.maps.StyledMapType(
    [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#d38360'
          }
        ]
      },
      {
        elementType: 'labels',
        stylers: [
          {
            visibility: 'simplified'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#523735'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#f5f1e6'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#c9b2a6'
          },
          {
            visibility: 'simplified'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#dcd2be'
          },
          {
            visibility: 'simplified'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#ae9e90'
          }
        ]
      },
      {
        featureType: 'poi',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dfd2ae'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#93817c'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#a5b076'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#447530'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [
          {
            color: '#ffa381'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          {
            color: '#806b63'
          },
          {
            visibility: 'simplified'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e98d58'
          }
        ]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#db8555'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#806b63'
          }
        ]
      },
      {
        featureType: 'transit',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dfd2ae'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#8f7d77'
          }
        ]
      },
      {
        featureType: 'transit.line',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#ebe3cd'
          }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dfd2ae'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#b9d3c2'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#92998d'
          }
        ]
      }
    ],
    { name: 'Styled Map' }
  );

  iconBase = '../assets/';

  icons = {
    presidentes: {
      icon: this.iconBase + 'presidentes2.png'
    },
    missoes: {
      icon: this.iconBase + 'missoes.png'
    },
    pao: {
      icon: this.iconBase + 'pao.png'
    }
  };

  PuzzlesButtom(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#a01d1d';
    controlUI.style.border = '2px solid #810c0c';
    controlUI.style.borderRadius = '30px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.marginBottom = '50px';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(255,255,255)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '20px';
    controlText.style.paddingRight = '20px';
    controlText.innerHTML = 'Meus Desafios';
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    controlUI.addEventListener('click', () =>
      this.router.navigate(['members', 'puzzles'])
    );
  }
  ProfileButtom(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#a01d1d';
    controlUI.style.border = '2px solid #810c0c';
    controlUI.style.borderRadius = '50%';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginRight = '22px';
    controlUI.style.marginTop = '22px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(255,255,255)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.style.verticalAlign = 'middle';
    controlText.innerHTML =
      '<ion-icon style="position: relative; top: 5px;" size="large" name="person"></ion-icon>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    controlUI.addEventListener('click', () =>
      this.router.navigate(['members', 'profile'])
    );
  }

  CameraButtom(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#a01d1d';
    controlUI.style.border = '2px solid #810c0c';
    controlUI.style.borderRadius = '50%';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginLeft = '28px';
    controlUI.style.marginBottom = '150px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(255,255,255)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.style.verticalAlign = 'middle';
    controlText.innerHTML =
      '<ion-icon style="position: relative; top: 5px;" size="large" name="camera"></ion-icon>';
    controlUI.appendChild(controlText);

    // Setup the click event listeners
    controlUI.addEventListener('click', () =>
      this.router.navigate(['members', 'ar'])
    );
  }

  CenterButtom(controlDiv, map) {
    // Set CSS for the control border.
    const controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#a01d1d';
    controlUI.style.border = '2px solid #810c0c';
    controlUI.style.borderRadius = '50%';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginRight = '28px';
    controlUI.style.marginBottom = '150px';
    controlUI.style.textAlign = 'center';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    const controlText = document.createElement('div');
    controlText.style.color = 'rgb(255,255,255)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.style.verticalAlign = 'middle';
    controlText.innerHTML =
      '<ion-icon style="position: relative; top: 5px;" size="small" name="radio-button-on"></ion-icon>';
    controlUI.appendChild(controlText);
  }
}
