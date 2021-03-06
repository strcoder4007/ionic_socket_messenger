webpackJsonp([0],{

/***/ 307:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatRoomPageModule", function() { return ChatRoomPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chat_room__ = __webpack_require__(308);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ChatRoomPageModule = (function () {
    function ChatRoomPageModule() {
    }
    return ChatRoomPageModule;
}());
ChatRoomPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__chat_room__["a" /* ChatRoomPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__chat_room__["a" /* ChatRoomPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__chat_room__["a" /* ChatRoomPage */]
        ]
    })
], ChatRoomPageModule);

//# sourceMappingURL=chat-room.module.js.map

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatRoomPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng_socket_io___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng_socket_io__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChatRoomPage = (function () {
    function ChatRoomPage(navCtrl, navParams, socket, toastCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socket = socket;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.messages = [];
        this.nickname = '';
        this.message = '';
        this.pvt = false;
        this.testRadioResult = '0';
        this.deltaMsg = '';
        this.nickname = this.navParams.get('nickname');
        this.getMessages().subscribe(function (message) {
            _this.messages.push(message);
        });
        this.getUsers().subscribe(function (data) {
            var user = data['user'];
        });
    }
    ChatRoomPage.prototype.myEmitter = function () {
        this.socket.emit('add-message', { text: this.deltaMsg });
        this.deltaMsg = '';
        this.testRadioResult = '0';
    };
    ChatRoomPage.prototype.sendMessage = function () {
        var _this = this;
        console.log(parseInt(this.testRadioResult) * 60 * 1000);
        if (this.testRadioResult == '0.017') {
            this.deltaMsg = this.message;
            this.message = '';
            setTimeout(function () {
                _this.myEmitter();
            }, 3000);
        }
        else {
            this.deltaMsg = this.message;
            this.message = '';
            setTimeout(function () {
                _this.myEmitter();
            }, parseInt(this.testRadioResult) * 60 * 1000);
        }
    };
    ChatRoomPage.prototype.getMessages = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('message', function (data) {
                observer.next(data);
                var junk = localStorage.getItem("pvt");
                if (junk == "true") {
                    setTimeout(function () {
                        data.pvt = true;
                    }.bind(_this), 5000);
                }
            });
        });
        return observable;
    };
    ChatRoomPage.prototype.getUsers = function () {
        var _this = this;
        var observable = new __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on('users-changed', function (data) {
                observer.next(data);
            });
        });
        return observable;
    };
    ChatRoomPage.prototype.ionViewWillLeave = function () {
        this.socket.disconnect();
    };
    ChatRoomPage.prototype.showToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    };
    ChatRoomPage.prototype.showConfirm = function () {
        var confirm = this.alertCtrl.create({
            title: 'Go Private?',
            message: 'In private mode all messages are deleted after 5 mins.',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        localStorage.setItem("pvt", "false");
                        console.log('Disagree clicked');
                    }
                }, {
                    text: 'Agree',
                    handler: function () {
                        localStorage.setItem("pvt", "true");
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    ChatRoomPage.prototype.setTime = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
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
            handler: function (data) {
                //this.testRadioOpen = false;
                _this.testRadioResult = data;
            }
        });
        alert.present();
    };
    ChatRoomPage.prototype.checkPvt = function () {
        if (localStorage.getItem("pvt") == "false") {
            return false;
        }
        else if (localStorage.getItem("pvt") == "true") {
            return true;
        }
    };
    ChatRoomPage.prototype.falsePvt = function () {
        localStorage.setItem("pvt", "false");
    };
    return ChatRoomPage;
}());
ChatRoomPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-chat-room',template:/*ion-inline-start:"/srv/http/ionic_socket_messenger/src/pages/chat-room/chat-room.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-row>\n        <ion-col col-11>\n            <ion-title>chat</ion-title>\n        </ion-col>\n        <ion-col col-1>\n            <ion-icon *ngIf="!checkPvt()" name="eye-off" (click)="showConfirm()"></ion-icon>\n            <ion-icon *ngIf="checkPvt()" name="eye" (click)="falsePvt()"></ion-icon>\n        </ion-col>\n    </ion-row>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-grid>\n    <ion-row *ngFor="let message of messages">\n      \n      <ion-col col-9 *ngIf="message.from !== nickname && !message.pvt" class="message" [ngClass]="{\'my_message\': message.from === nickname, \'other_message\': message.from !== nickname}">\n        <span class="user_name">{{ message.from }}:</span><br>\n        <span>{{ message.text }}</span>\n        <div class="time">{{message.created | date:\'dd.MM hh:MM\'}}</div>\n      </ion-col>\n\n      <ion-col offset-3 col-9 *ngIf="message.from === nickname && !message.pvt" class="message" [ngClass]="{\'my_message\': message.from === nickname, \'other_message\': message.from !== nickname}">\n        <span class="user_name">{{ message.from }}:</span><br>\n        <span>{{ message.text }}</span>\n        <div class="time">{{message.created | date:\'dd.MM hh:MM\'}}</div>\n      </ion-col>\n\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-row class="message_row">\n      <ion-col col-8>\n        <ion-item no-lines>\n          <ion-input type="text" placeholder="Message" [(ngModel)]="message"></ion-input>\n        </ion-item>\n      </ion-col>\n      <ion-col col-1>\n        <button ion-button clear color="primary" (click)="setTime()" [disabled]="message === \'\'">\n            <ion-icon name="time"></ion-icon>\n      </button>\n      </ion-col>\n      <ion-col col-3>\n        <button ion-button clear color="primary" (click)="sendMessage()" [disabled]="message === \'\'">\n        send\n      </button>\n      </ion-col>\n    </ion-row>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/srv/http/ionic_socket_messenger/src/pages/chat-room/chat-room.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng_socket_io__["Socket"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* AlertController */]) === "function" && _e || Object])
], ChatRoomPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=chat-room.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map