import { Component } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import { Chat, MessageType } from '../../../../imports/models';
import template from './chats.html';
 
@Component({
  template
})
export class ChatsPage {
  chats: Observable<Chat[]>;
 
  constructor() {
    this.chats = this.findChats();
  }
 
  private findChats(): Observable<Chat[]> {
    return Observable.of([
      {
        _id: '0',
        title: 'Ethan Gonzalez',
        picture: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
        lastMessage: {
          content: 'Open mic night | Please register beforehand | {location name} | {address}',
          createdAt: Moment().add(1, 'days').toDate(),
          type: MessageType.TEXT
        },
        favorites: '12'
      },
      {
        _id: '1',
        title: 'Bryan Wallace',
        picture: 'https://randomuser.me/api/portraits/thumb/lego/1.jpg',
        lastMessage: {
          content: 'Happy Hour 4-7 pm | No RSVP needed | {location name} |{address}',
          createdAt: Moment().add(1, 'days').subtract(45, 'minutes').toDate(),
          type: MessageType.TEXT
        },
        favorites: '33'
      },
      {
        _id: '2',
        title: 'Avery Stewart',
        picture: 'https://randomuser.me/api/portraits/thumb/women/1.jpg',
        lastMessage: {
          content: 'Troy Farmers Market | No RSVP needed | {location name} | {address}',
          createdAt: Moment().add(2, 'days').toDate(),
          type: MessageType.TEXT
        },
        favorites: '154'
      },
      {
        _id: '3',
        title: 'Katie Peterson',
        picture: 'https://randomuser.me/api/portraits/thumb/women/2.jpg',
        lastMessage: {
          content: 'Relay 4 Life | Please register beforehand | {location name} | {address}',
          createdAt: Moment().add(4, 'days').add(2, 'hours').toDate(),
          type: MessageType.TEXT
        },
        favorites: '19'
      },
      {
        _id: '4',
        title: 'Ray Edwards',
        picture: 'https://randomuser.me/api/portraits/thumb/men/2.jpg',
        lastMessage: {
          content: 'Comedy Show | Tickets Available for Purchase | {location name} | {address}',
          createdAt: Moment().add(2, 'weeks').add(1,'days').toDate(),
          type: MessageType.TEXT
        },
        favorites: '9'
      }
    ]);
  }

  removeChat(chat: Chat): void {
    this.chats = this.chats.map<Chat[]>(chatsArray => {
      const chatIndex = chatsArray.indexOf(chat);
      chatsArray.splice(chatIndex, 1);
 
      return chatsArray;
    });
  }
}