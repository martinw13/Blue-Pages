export enum MessageType {
  TEXT = <any>'text'
}
 
export interface Event {
  _id?: string;
  title?: string;
  description?: string;
  picture?: string;
  favorites?: number;
  time?: Date;
  address?: string;
  createdAt?: Date;
  minimumAge?: number;
  url?: string;
}
 
export interface UserEvent {
  _id?: string;
  userId?: string;
  eventId?: string;
  userEventStatus?: string;
}