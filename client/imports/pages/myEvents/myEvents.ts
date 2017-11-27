import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import template from './myEvents.html';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';
import { CreateEventModal } from '../createEventModal/createEventModal';
import { DetailsModal } from '../detailsModal/detailsModal';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../../imports/collections';
import { Event, UserEvent } from '../../../../imports/models';
 
@Component({
  template
})
export class MyEventsPage implements OnInit {
  myEvents: Array<Event> = [];;
  userEvents;
  favorites: Array<Event> = [];
  constructor(public modalCtrl: ModalController, private navCtrl: NavController) {
  }
  
  //method to determine whether there is a currently active user
  hasCurrentUser() {
    if(Meteor.user())
    {
      return true;
    }else
    {
      return false;
    }
  }

  //method to open the create event modal
  openCreateEvent() {
    let modal = this.modalCtrl.create(CreateEventModal);
    modal.present();
  }

  //method to open the event details modal
  openDetails(eventId: string) {
    let modal = this.modalCtrl.create(DetailsModal, {eventId: eventId});
    modal.present();
  }

  //method to "unfavorite" an event from the detailed view modal
  removeFavorite(_eventId: string): void {
    let removeFavorite = UserEvents.findOne({userId:Meteor.userId(), eventId: _eventId , userEventStatus: "1"});
    UserEvents.remove({_id: removeFavorite._id}).subscribe(() => {});
    Events.update(
      {_id: _eventId},
      {$inc: {'favorites':-1}}
      );
  }

  //actions to perform on init.  kind of like a constructor extension
  ngOnInit() {
    this.userEvents = UserEvents.find({}).fetch();

    let myEventsFromUserEvents = this.userEvents.filter(userEvent => userEvent.userId == Meteor.userId() && userEvent.userEventStatus == '0');
    let favoritesFromUserEvents = this.userEvents.filter(userEvent => userEvent.userId == Meteor.userId() && userEvent.userEventStatus == '1');

    for(var i = 0; i < myEventsFromUserEvents.length; i++)
    {
        let temp = Events.findOne({_id: myEventsFromUserEvents[i].eventId});
        if(temp){
          this.myEvents.push(temp);
        }
    }

    for(var i = 0; i < favoritesFromUserEvents.length; i++)
    {
        let temp = Events.findOne({_id: favoritesFromUserEvents[i].eventId});
        if(temp){
          this.favorites.push(temp);
        }
    }
  }

  //method to remove an event
  removeChat(event: Event): void {
    Events.remove({_id: event._id}).subscribe(() => {});
    this.navCtrl.push(MyEventsPage);
  }
}