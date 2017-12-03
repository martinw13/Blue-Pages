import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ViewController, NavParams, NavController, ModalController } from 'ionic-angular';
import template from './createEventModal.html';
import { AuthService } from "angular2-social-login";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../../imports/collections';
import { Event, UserEvent } from '../../../../imports/models';
import * as Moment from 'moment';
import { TitleValidator } from '../../validators/title';
import { TimeAndPlaceExistsModal } from '../timeAndPlaceExistsModal/timeAndPlaceExistsModal';
import { MyEventsPage } from '../myEvents/myEvents';


@Component({
  template
})
export class CreateEventModal {
  editEvent;
  edit: Boolean;
  authEvent: FormGroup;

  constructor(
    public viewCtrl: ViewController,
    params: NavParams,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
    this.edit = false;
    
    if(params.get('eventId')){
      this.editEvent = Events.findOne({_id: params.get('eventId') });
      this.edit = true;
      this.authEvent = formBuilder.group({
        title: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.minLength(2)])],
        address: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\\.\\-\\, ]*'), Validators.minLength(10)])],
        description: ['', Validators.compose([Validators.required])],
        picture: ['', Validators.compose([Validators.required])],
        date: ['', Validators.compose([Validators.required])]
      });
    }else{
      this.authEvent = formBuilder.group({
        title: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[a-zA-Z0-9 ]*'), Validators.minLength(2)]), TitleValidator.isValid],
        address: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z0-9\\.\\-\\, ]*'), Validators.minLength(10)])],
        description: ['', Validators.compose([Validators.required])],
        picture: ['', Validators.compose([Validators.required])],
        date: ['', Validators.compose([Validators.required])]
      });
    }
  }

  //method that inserts/updates an event into the collection
  createEvent(value: any){
    if(this.checkDateAndAddress(value.address, value.date) && !this.edit){
      this.dismiss();
      let modal = this.modalCtrl.create(TimeAndPlaceExistsModal);
      modal.present();
      return;
    }

    //if the event is valid
    if(this.authEvent.valid){
      //if edit
      if(this.edit){
          Events.collection.update(this.editEvent._id,{
            $set: {title: value.title,
                   address: value.address,
                   description: value.description,
                   picture: value.picture,
                   createdAt: Moment(value.date).valueOf()}
          });
          let data = {"data" : "edit",
                      "title": value.title };
          this.dismiss(data);
      //else create a new one
      }else{
        let eventId;
        let userEventId;
     
        eventId = Events.collection.insert({
          title: value.title,
          address: value.address,
          favorites: 0,
          description: value.description,
          picture: value.picture,
          createdAt: Moment(value.date).valueOf(),
          createdBy: Meteor.user().emails[0].address.toString()
        });
        userEventId = UserEvents.collection.insert({
          userId: Meteor.userId(),
          eventId: eventId,
          userEventStatus: "0"
        });
        let data = {"data" : "create",
                    "title": value.title };
        this.dismiss(data);
      }
      
    }
    
  }

  //validation method that checks for duplicate date/address combo in the collection
  checkDateAndAddress(_address, _date){
    let target = Events.findOne({address: _address, createdAt: Moment(_date).valueOf()});
    if(target){
      return true;
    }
    return false;
  }

  //method required to close the modal
  dismiss(data) {
    this.viewCtrl.dismiss(data);
  }
}