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

  getItems(searchbar: any){
    // set title to the value of the searchbar
    var title = searchbar.srcElement.value;

    // if the user hasn't typed anything, return all events
    if (!title) {
       this.events = Events.find({});
    }
    else{ // return the events with a substring that matches title
       var regex = new RegExp(["^", title].join(""), "i");
       this.events = Events.find({"title": regex})
       //this.events = Events.find({"title": {$regex: title, $options:"$i"}});
    }
       this.userEvents = UserEvents.find({});
 }


  ngOnInit(searchbar: any) {
       this.events = Events.find({});
       this.userEvents = UserEvents.find({});
  }

  removeChat(event: Event): void {
    Events.remove({_id: event._id}).subscribe(() => {});
  }
}