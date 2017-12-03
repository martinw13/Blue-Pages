import { Component, OnInit } from '@angular/core';
import * as Moment from 'moment';
import { Observable } from 'rxjs';
import template from './aboutView.html';
import { ModalController, Platform, NavParams, ViewController, NavController } from 'ionic-angular';

@Component({
  template
})
export class AboutPage implements OnInit {

	constructor(public modalCtrl: ModalController, private navCtrl: NavController) {}

	ngOnInit() {}
}