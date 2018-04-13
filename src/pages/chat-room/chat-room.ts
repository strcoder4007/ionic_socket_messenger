import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  messages = [];
  nickname = '';
  message = '';
  pvt = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController, public alertCtrl : AlertController) {
    this.nickname = this.navParams.get('nickname');

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
        let junk = localStorage.getItem("pvt");
        if(junk == "true") {
            setTimeout(function() {
                data.pvt = true;
            }.bind(this), 5000);
        }
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  showConfirm() {
    let confirm = this.alertCtrl.create({
            title: 'Go Private?',
            message: 'In private mode all messages are deleted after 5 mins.',
            buttons: [
                {
                    text: 'Disagree',
                    handler: () => {
                        localStorage.setItem("pvt", "false");                    
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Agree',
                    handler: () => {
                        localStorage.setItem("pvt", "true");
                        console.log('Agree clicked');
                    }
                }
            ]
        });
    confirm.present();
}




}
