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
  testRadioResult = '0';
  deltaMsg = '';

  constructor(private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController, public alertCtrl : AlertController) {
    this.nickname = this.navParams.get('nickname');

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
    });
  }

  myEmitter() {
    this.socket.emit('add-message', { text: this.deltaMsg });
    this.deltaMsg = '';
    this.testRadioResult = '0';
  }

  sendMessage() {
      console.log(parseInt(this.testRadioResult)*60*1000);
      if(this.testRadioResult == '0.017') {
          this.deltaMsg = this.message;
          this.message = '';
        setTimeout(() => {
            this.myEmitter();
        }, 3000);
      }
      else {
        this.deltaMsg = this.message;
        this.message = '';
        setTimeout(() => {
            this.myEmitter();
          }, parseInt(this.testRadioResult)*60*1000);
      }

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

setTime() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');


    alert.addInput({
        type: 'radio',
        label: '3 sec',
        value: '0.017',
        checked: false
      });    
    alert.addInput({
      type: 'radio',
      label: '5 mins',
      value: '5',
      checked: false
    });
    alert.addInput({
        type: 'radio',
        label: '10 mins',
        value: '10',
        checked: false
    });
    alert.addInput({
        type: 'radio',
        label: '15 mins',
        value: '15',
        checked: false
    });
    alert.addInput({
        type: 'radio',
        label: '20 mins',
        value: '20',
        checked: false
    });


    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        //this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
    alert.present();
  }

checkPvt() {
    if(localStorage.getItem("pvt") == "false") {
        return false;
    }
    else if(localStorage.getItem("pvt") == "true") {
        return true;
    }
}

falsePvt() {
    localStorage.setItem("pvt", "false");
}

}
