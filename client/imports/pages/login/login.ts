import { Component, OnDestroy } from '@angular/core';
import { ViewController } from 'ionic-angular';
import template from './login.html';
import { AuthService } from "angular2-social-login";
import { Accounts } from 'meteor/accounts-base';

@Component({
  template
})
export class LoginModal {
  // public user;
  // sub: any;

  constructor(
    public viewCtrl: ViewController
    //public _auth: AuthService
  ) {
  }

  // signIn(provider){
  //   this.sub = this._auth.login(provider).subscribe(
  //     (data) => {
  //       console.log(data);
  //       this.user=data;
  //       //console.log(data.email);
  //     }
  //   )
  // }

  // logout(){
  //   this._auth.logout().subscribe(
  //     (data)=>{console.log(data);this.user=null;}
  //   )
  // }

  // ngOnDestroy(){
  //   this.sub.unsubscribe();
  // }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}