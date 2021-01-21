import { Component, OnInit } from '@angular/core';
import { AlertaService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-ar',
  templateUrl: './ar.page.html',
  styleUrls: ['./ar.page.scss'],
})
export class ArPage implements OnInit {

  load;

  constructor(private alert: AlertaService) { }
  
  async ngOnInit() {
    this.load = await this.alert.loading();
    await this.delay(5000).then(() => this.load.dismiss())
    }
  

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

}
