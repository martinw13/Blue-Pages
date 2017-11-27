import { MongoObservable } from 'meteor-rxjs';
import { Event } from '../models';

//This defines the Events collection (database) for the entire app
export const Events = new MongoObservable.Collection<Event>('events');