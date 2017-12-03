import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import template from './mapView.html';
import { ModalController, Platform, NavParams, ViewController, ToastController } from 'ionic-angular';
import { CreateEventModal } from '../createEventModal/createEventModal';
import { DetailsModal } from '../detailsModal/detailsModal';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../../imports/collections';
import { Event, UserEvent, marker } from '../../../../imports/models';
import { } from 'googlemaps';
import { MapsAPILoader } from 'angular2-google-maps/core';

//very necessary to define the styles for the google map here
@Component({
  styles:['.sebm-google-map-container{height: 600px; width: 100%;} '],
  template
})
export class MapViewPage implements OnInit {
  events;
  userEvents;
  isSearching = false;
  markers: Array<any> = [];

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  
  //view child used for the google maps autocomplete location search
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) {}

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

  //method that retrieves events based on the search query
  getItems(searchbar: any){
    this.isSearching = true;
    // set title to the value of the searchbar
    var title = searchbar.srcElement.value;
    if(!title){
      this.isSearching = false;
    }

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

  //method to load the markers into the google map from the existing events
  //involves converting the given address into google's default latitude/longitude format
  //via the "geocode" object
  loadPoints(){
    var tempArray = [];
    var i;
    for(i = 0; i < this.events.length; i++)
    {
      var geocoder = new google.maps.Geocoder();
      let address = this.events[i].address;
      //console.log();
      let tempLabel = this.events[i].title.toString();
      let tempDescription = this.events[i].description.toString();
      let tempDate = this.events[i].createdAt;
      let tempFavorites = this.events[i].favorites.toString();
      let tempPicture = this.events[i].picture.toString();
      let tempId = this.events[i]._id.toString();
      let tempCreatedBy = this.events[i].createdBy;
      geocoder.geocode({'address':address}, function(results, status){
        if( status == google.maps.GeocoderStatus.OK ) {
            //console.log(tempLabel);
            var temp = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
              label: tempLabel,
              draggable: false,
              description: tempDescription,
              date: tempDate,
              favorites: tempFavorites,
              picture: tempPicture,
              id: tempId,
              createdBy: tempCreatedBy
            };
            //console.log(temp);
            //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
            tempArray.push(temp);
        } else {
            console.log( 'Geocode was not successful for the following reason: ' + status );
        }
      });
    }

    return tempArray;
  }

  //actions to perform on init.  kind of like a constructor extension
  ngOnInit() {
    //get list of events
    this.events = Events.find({}).fetch();
    this.userEvents = UserEvents.find({}).fetch();
    
    //set google maps defaults
    this.zoom = 12;
    this.latitude = 42.730265;
    this.longitude = -73.681390;

    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
      this.markers = this.loadPoints();
    });
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