import { MongoObservable } from 'meteor-rxjs';
import { UserEvent } from '../models';
 
export const UserEvents = new MongoObservable.Collection<UserEvent>('userEvents');