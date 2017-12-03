import { Component, OnDestroy } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import template from './timeAndPlaceExistsModal.html';
import { AuthService } from "angular2-social-login";
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

@Component({
  template
})
export class TimeAndPlaceExistsModal {
	constructor(
    public viewCtrl: ViewController
  	) {}

	//method required to dismiss the modal
  	dismiss() {
    	this.viewCtrl.dismiss();
  	}
}