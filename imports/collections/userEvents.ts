import { MongoObservable } from 'meteor-rxjs';
import { UserEvent } from '../models';

//This defines the UserEvents collection (database) for the entire app
export const UserEvents = new MongoObservable.Collection<UserEvent>('userEvents');