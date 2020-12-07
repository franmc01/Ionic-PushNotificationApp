import { ApplicationRef, Component, OnInit } from '@angular/core';
import { PushNotiService } from '../services/push-noti.service';
import { OSNotificationPayload } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  mensajes: OSNotificationPayload[] = [];
  constructor(private pushService: PushNotiService, private aplicationRef:ApplicationRef) { }

  ngOnInit() {
    this.pushService.pushListener.subscribe(noti => {
      this.mensajes.unshift(noti);
      this.aplicationRef.tick();
    })
  }


  async ionViewWillEnter(){
    console.log('Will Enter - Cargar Mensajes');
    this.mensajes = await this.pushService.getMensajes();
  }

}
