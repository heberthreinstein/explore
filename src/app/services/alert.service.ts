import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { LoadingOptions, ToastOptions, AlertOptions } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private toastCtrl: ToastController,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) { }


  public async loading(opcoes?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Carregando',
      ...opcoes
    });
    loading.present();
    return loading;
  }

  public async toast(opcoes: ToastOptions): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      duration: 10000,
      showCloseButton: true,
      closeButtonText: 'Fechar',
      ...opcoes
    });
    toast.present();
    return toast;
  }

  public async alert(opcoes: AlertOptions): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      backdropDismiss: true ,
      ...opcoes
    });
    alert.present();
    return alert;
  }
}
