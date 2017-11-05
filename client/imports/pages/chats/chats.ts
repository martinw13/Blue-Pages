import { Component } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import template from './chats.html';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import {LoginModal} from '../login/login';
import { Meteor } from 'meteor/meteor';
 
@Component({
  template
})
export class ChatsPage {
  chats: Observable<any[]>;
 
  constructor(public modalCtrl: ModalController) {
    this.chats = this.findChats();
  }
  
  currentUser() {
  	console.log(Meteor.user());
    return Meteor.user();
  }

  openLogin() {

    let modal = this.modalCtrl.create(LoginModal);
    modal.present();
  }

  private findChats(): Observable<any[]> {
    return Observable.of([
      {
        _id: '0',
        title: 'Ethan Gonzalez',
        picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
        lastMessage: {
          content: 'You on your way?',
          createdAt: Moment().subtract(1, 'hours').toDate()
        }
      },
      {
        _id: '1',
        title: 'Bryan Wallace',
        picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
        lastMessage: {
          content: 'Hey, it\'s me',
          createdAt: Moment().subtract(2, 'hours').toDate()
        }
      },
      {
        _id: '2',
        title: 'Avery Stewart',
        picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
        lastMessage: {
          content: 'I should buy a boat',
          createdAt: Moment().subtract(1, 'days').toDate()
        }
      },
      {
        _id: '3',
        title: 'Katie Peterson',
        picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
        lastMessage: {
          content: 'Look at my mukluks!',
          createdAt: Moment().subtract(4, 'days').toDate()
        }
      },
      {
        _id: '4',
        title: 'Ray Edwards',
        picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
        lastMessage: {
          content: 'This is wicked good ice cream.',
          createdAt: Moment().subtract(2, 'weeks').toDate()
        }
      }
    ]);
  }
}

// @Component({
//   loginModal
// })
// export class LoginModal{

// 	constructor(
//     public platform: Platform,
//     public params: NavParams,
//     public viewCtrl: ViewController
//     ){}

// 	dismiss(){
// 		this.viewCtrl.dismiss();
// 	}
// }