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
  }

  //method to "favorite" an event from the detailed view modal
  favoriteEvent(eventId: string){
    let userEventId;
    userEventId = UserEvents.collection.insert({
      userId: Meteor.userId(),
      eventId: eventId,
      userEventStatus: "1"
    });

    Events.update(
      {_id: eventId},
      {$inc: {'favorites':1}}
      );

    this.dismiss();
  }

  //method to "unfavorite" an event from the detailed view modal
  removeFavorite(_eventId: string): void {
    let removeFavorite = UserEvents.findOne({userId:Meteor.userId(), eventId: _eventId , userEventStatus: "1"});
    UserEvents.remove({_id: removeFavorite._id}).subscribe(() => {});
    Events.update(
      {_id: _eventId},
      {$inc: {'favorites':-1}}
      );
    this.dismiss();
  }

  //method to determine whether or not the active user has already favorited the event
  isFavorite(_eventId: string){
    let tempUserEvent = UserEvents.findOne({userId:Meteor.userId(), eventId: _eventId , userEventStatus: "1"});
    if(tempUserEvent != null)
    {
      return true;
    }else
    {
      return false;
    }
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

  //method required to dismiss the modal
  dismiss() {
    this.viewCtrl.dismiss();
  }
}