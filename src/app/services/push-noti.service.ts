import { Injectable } from '@angular/core';
import { OneSignal, OSNotification } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushNotiService {

  mensajes: any[] = [
    {
      titulo: 'Titulo',
      cuerpo: 'Cuerpo de la push',
      fecha: new Date()
    }
  ];
  constructor(private oneSignal: OneSignal) { }


  configuracionInicial() {
    this.oneSignal.startInit('194d97e5-981c-4f56-b465-35b5b86dcb2b', '186638147288');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      // do something when notification is received
      console.log('Notificacion recibida: ', noti);
      this.notificacionRecibida(noti);
    });
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log('Notificacion abierta: ', noti);
    });
    this.oneSignal.endInit();
  }


  notificacionRecibida(noti: OSNotification) {
    const payload = noti.payload;
    const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);
    if (existePush) {
      return;
    }
    this.mensajes.unshift(payload);
  }
}
