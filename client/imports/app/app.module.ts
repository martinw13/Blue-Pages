import { NgModule, ErrorHandler } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ChatsPage } from '../pages/chats/chats'
import { BrowserModule } from '@angular/platform-browser';
 
@NgModule({
  declarations: [
    MyApp,
    ChatsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp), 
    BrowserModule,
    MomentModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}