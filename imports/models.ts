export enum MessageType {
  TEXT = <any>'text'
}
 
export interface Chat {
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
 
export interface Message {
  _id?: string;
  chatId?: string;
  content?: string;
  createdAt?: Date;
  type?: MessageType
}