import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import { Chats, Messages } from '../../../../imports/collections';
import { Chat, MessageType } from '../../../../imports/models';
import template from './chats.html';
 
@Component({
  template
})

export class ChatsPage implements OnInit {
  chats;
 
  constructor() {
  }
 
  ngOnInit() {
    this.chats = Chats.find({})
  }
 
  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {});
  }


}
