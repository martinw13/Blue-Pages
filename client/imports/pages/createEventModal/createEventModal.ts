import { Component, OnDestroy } from '@angular/core';
import { ViewController } from 'ionic-angular';
import template from './createEventModal.html';
import { AuthService } from "angular2-social-login";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../../imports/collections';
import { Event, UserEvent } from '../../../../imports/models';
import * as Moment from 'moment';

@Component({
  template
})
export class CreateEventModal {
  newEvent = {};

  constructor(
    public viewCtrl: ViewController
  ) {}

  createEvent(){
    let eventId;
    let userEventId;
 
    eventId = Events.collection.insert({
      title: this.newEvent.title,
      address: this.newEvent.address,
      favorites: 0,
      description: this.newEvent.description,
      picture: this.newEvent.picture,
      createdAt: Moment(this.newEvent.date).valueOf()
    });
    userEventId = UserEvents.collection.insert({
      userId: Meteor.userId(),
      eventId: eventId,
      userEventStatus: "0"
    });
    console.log(userEventId);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}