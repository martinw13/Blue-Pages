import { FormControl } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { Events, UserEvents } from '../../../imports/collections';
import { Event, UserEvent, marker } from '../../../imports/models';
import { Observable } from 'rxjs';

export class TitleValidator {
 
	static isValid(control: FormControl): any {
		return new Promise(resolve => {

	      //Fake a slow response from server
	      setTimeout(() => {
	      	let target = Events.findOne({title: control.value.toString()});
	        if(target){
	          
	          resolve({
	            "exists": true
	          });

	        } else {
	          resolve(null);
	        }
	      }, 2000);

	    });
	}
 
}