import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import template from './myEvents.html';
import { ModalController, Platform, NavParams, ViewController, NavController, ToastController } from 'ionic-angular';
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
  constructor(public modalCtrl: ModalController, private navCtrl: NavController,
              public toastCtrl: ToastController) {
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
    modal.onDidDismiss(data=>{
      if(data != null && data.data == 'create'){
        let str1 = 'Successfully created [';
        let str3 = '].'
        this.showToastWithCloseButton(str1.concat(data.title, str3));
      }
    });
    modal.present();
  }

  //method to open the edit version of the create event modal
  openEditEvent(eventId: string){
    let modal = this.modalCtrl.create(CreateEventModal, {eventId: eventId});
    
    modal.onDidDismiss(data=>{
      if(data != null && data.data == 'edit'){
        this.navCtrl.pop();
        this.navCtrl.push(MyEventsPage);
        let str1 = 'Successfully updated [';
        let str3 = '].'
        this.showToastWithCloseButton(str1.concat(data.title, str3));
      }
    });
    modal.present();
  }

  //method to open the event details modal
  openDetails(eventId: string) {
    let modal = this.modalCtrl.create(DetailsModal, {eventId: eventId});
    modal.onDidDismiss(data=>{
      if(data != null && data.data == 'favorite'){
        let str1 = 'Successfully added [';
        let str3 = '] to favorites.'
        this.showToastWithCloseButton(str1.concat(data.title, str3));
      }else if(data != null && data.data == 'unfavorite'){
        let str1 = 'Successfully removed [';
        let str3 = '] from favorites.'
        this.showToastWithCloseButton(str1.concat(data.title, str3));
      }
    });
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
      this.navCtrl.pop();
      this.navCtrl.push(MyEventsPage);
      let tempEvent = Events.findOne({_id: _eventId});
      let str1 = 'Successfully removed [';
      let str3 = '] from favorites.'
      this.showToastWithCloseButton(str1.concat(tempEvent.title, str3));
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
    let eventTitle = event.title;
    Events.remove({_id: event._id}).subscribe(() => {});
    this.navCtrl.pop();
    this.navCtrl.push(MyEventsPage);
    let str1 = 'Successfully removed [';
    let str3 = '].'
    this.showToastWithCloseButton(str1.concat(eventTitle, str3));
  }

  //function to show a toast (alert) whenever an action is completed
  showToastWithCloseButton(_message) {
    const toast = this.toastCtrl.create({
      message: _message,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    toast.present();
  }
}