import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import template from './chats.html';
import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';
import { CreateEventModal } from '../createEventModal/createEventModal';
import { DetailsModal } from '../detailsModal/detailsModal';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../../imports/collections';
import { Event, UserEvent } from '../../../../imports/models';
 
@Component({
  template
})
export class ChatsPage implements OnInit {
  events;
  userEvents;
  constructor(public modalCtrl: ModalController) {
  }
  
  hasCurrentUser() {
    if(Meteor.user())
    {
      return true;
    }else
    {
      return false;
    }
  }

  openCreateEvent() {
    let modal = this.modalCtrl.create(CreateEventModal);
    modal.present();
  }

  openDetails(eventId: string) {
    let modal = this.modalCtrl.create(DetailsModal, {eventId: eventId});
    modal.present();
  }

  ngOnInit() {
    this.events = Events.find({});
    this.userEvents = UserEvents.find({});
  }

  removeChat(event: Event): void {
    Events.remove({_id: event._id}).subscribe(() => {});
  }
}