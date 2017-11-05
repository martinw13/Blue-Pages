import { NgModule, ErrorHandler, OnDestroy } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats';
import { LoginModal } from '../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
//import { Angular2SocialLoginModule } from "angular2-social-login";
import { AccountsModule } from 'angular2-meteor-accounts-ui';
 
// let providers = {
//     "google": {
//       "clientId": "146328356202-ljskse68k8fhu4lunpqd9gp6aq5mv2a4.apps.googleusercontent.co",
//       "clientSecret": "-r6oK9HFYUXHY82QDgb8tyhj"
//     },
//     "facebook": {
//       "clientId": "1461069033986851",
//       "apiVersion": "v2.10"
//     }
// };


@NgModule({
  declarations: [
    MyApp,
    ChatsPage,
    LoginModal  
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
    BrowserModule,
    MomentModule,
    AccountsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    LoginModal
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {
  constructor(){}
}

//Angular2SocialLoginModule.loadProvidersScripts(providers);