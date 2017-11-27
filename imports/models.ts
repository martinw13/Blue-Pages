//This file exports the various models (interfaces) to the rest of the application

//The Event interface
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
  createdBy?: string;
}

//The UserEvents interface
export interface UserEvent {
  _id?: string;
  userId?: string;
  eventId?: string;
  userEventStatus?: string;
}

//The marker interface for the google maps data points
export interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}