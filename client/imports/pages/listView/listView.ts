import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import template from './listView.html';
import { ModalController, Platform, NavParams, ViewController, NavController, ToastController } from 'ionic-angular';
import { CreateEventModal } from '../createEventModal/createEventModal';
import { DetailsModal } from '../detailsModal/detailsModal';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../../imports/collections';
import { Event, UserEvent } from '../../../../imports/models';
import { MapViewPage } from '../mapView/mapView';
import { MyEventsPage } from '../myEvents/myEvents';
import { AboutPage } from '../aboutView/aboutView';
 
@Component({
  template
})
export class ListViewPage implements OnInit {
  events;
  userEvents;
  
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

  //method to open the map view page
  openMapView(){
    this.navCtrl.push(MapViewPage);
  }

  //method to open the my events page
  openMyEvents(){
    this.navCtrl.push(MyEventsPage);
  }

  //method to open the about page
  openAbout(){
    this.navCtrl.push(AboutPage);
  }

  //method that retrieves events based on the search query
  getItems(searchbar: any){
    // set title to the value of the searchbar
    var title = searchbar.srcElement.value;

    // if the user hasn't typed anything, return all events
    if (!title) {
       this.events = Events.find({});
    }
    else{ // return the events with a substring that matches title
       var regex = new RegExp(["", title].join(""), "i");
       this.events = Events.find({"title": regex})
       //this.events = Events.find({"title": {$regex: title, $options:"$i"}});
    }
       this.userEvents = UserEvents.find({});
   }

  //actions to perform on init.  kind of like a constructor extension
  ngOnInit(searchbar: any) {
    this.events = Events.find({});
    this.userEvents = UserEvents.find({});
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