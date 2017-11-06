import { Component, OnDestroy } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import template from './detailsModal.html';
import { AuthService } from "angular2-social-login";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../../imports/collections';
import { Event, UserEvent } from '../../../../imports/models';
import * as Moment from 'moment';

@Component({
  template
})
export class DetailsModal {
  event;
  userEvent;
  eventOwnerEmail;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams
  ) {
    this.event = Events.findOne({_id: params.get('eventId') });
    this.userEvent = UserEvents.findOne({eventId: params.get('eventId') , userEventStatus: "0"});
    console.log(this.userEvent);
    if(this.userEvent)
    {
      console.log(Meteor.users.findOne({_id: this.userEvent.userId}));
      this.eventOwnerEmail = Meteor.users.findOne({_id: this.userEvent.userId}).emails[0].address;

      console.log(this.eventOwnerEmail);
    }
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}