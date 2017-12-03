import { NgModule, ErrorHandler, OnDestroy } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ListViewPage } from '../pages/listView/listView';
import { CreateEventModal } from '../pages/createEventModal/createEventModal';
import { DetailsModal } from '../pages/detailsModal/detailsModal';
import { MapViewPage } from '../pages/mapView/mapView';
import { MyEventsPage } from '../pages/myEvents/myEvents';
import { AboutPage } from '../pages/aboutView/aboutView';
import { TimeAndPlaceExistsModal } from '../pages/timeAndPlaceExistsModal/timeAndPlaceExistsModal';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";


//The main NgModule
//Any new components, pages, modals, and packages must be included in this declaration
@NgModule({
  declarations: [
    MyApp,
    ListViewPage,
    CreateEventModal,
    DetailsModal,
    MapViewPage,
    MyEventsPage,
    TimeAndPlaceExistsModal,
    AboutPage  
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
    BrowserModule,
    MomentModule,
    AccountsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBvz0J5z_nwuHGrdVMkHsvbMdvwnr2CesI',
      libraries: ["places"]
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListViewPage,
    CreateEventModal,
    DetailsModal,
    MapViewPage,
    MyEventsPage,
    TimeAndPlaceExistsModal,
    AboutPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
  constructor(){}
}