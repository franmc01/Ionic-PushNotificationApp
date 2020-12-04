import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushNotiService {

  constructor(private oneSignal: OneSignal) { }


  configuracionInicial() {
    this.oneSignal.startInit('194d97e5-981c-4f56-b465-35b5b86dcb2b', '186638147288');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificacion recibida: ', noti);
    });
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta: ', noti);
    });
    this.oneSignal.endInit();
  }
}
