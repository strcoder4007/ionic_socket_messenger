import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nickname = '';

  constructor(public navCtrl: NavController, private socket: Socket) {
      if(localStorage.getItem("pvt") == undefined) {
        localStorage.setItem("pvt", "false");
      }
   }

  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push('ChatRoomPage', { nickname: this.nickname });
  }
}
