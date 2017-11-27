import 'zone.js';
import 'reflect-metadata';
 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Meteor } from 'meteor/meteor';
import { AppModule } from './imports/app/app.module';


//The bootstrapping action for the entire application
//This essentially budles all of the components and packages together 
//on startup.
Meteor.startup(() => {
  platformBrowserDynamic().bootstrapModule(AppModule);
});
