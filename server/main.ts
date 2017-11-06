import { Meteor } from 'meteor/meteor';
import * as Moment from 'moment';
import { Events } from '../imports/collections';

Meteor.startup(() => {
  // code to run on server at startup
  if (Events.find({}).cursor.count() === 0) {
    let eventId;
 
    eventId = Events.collection.insert({
      title: 'Russell Peters Stand Up',
      address: 'Troy Savings Bank Music Hall, Troy NY',
      favorites: 33,
      description: 'Russell Peters will perform a stand comedy show in Troy this weekend. Buy tickets from our website',
      picture: 'http://images.indianexpress.com/2014/12/russell-peters-759.jpg',
      createdAt: Moment().add(1, 'weeks').toDate()
    });
 
    eventId = Events.collection.insert({
      title: 'The Low Beat',
      address: 'Live music venue in Albany, New York',
      favorites: 99,
      description: 'We are hosting an event a with live music. Happy Hour 4-7 pm and no RSVP needed',      
      picture: 'http://www.nippertown.com/zeblog/wp-content/uploads/2014/01/TheLowBeat.jpg',
      createdAt: Moment().add(1, 'months').toDate()
    });
  
    eventId = Events.collection.insert({
      title: 'Troy Farmers Market',
      address: '49 4th St, Troy, NY 12181',
      favorites: 77,
      description: 'The Troy Waterfront Farmers Market is delighted to bring you nearly 100 local farmers and fresh food vendors every Saturday, year-round in Downtown Troy, New York. For over 18 years, we have been a leader in supporting local agribusiness and providing a livelihood to farmers and food producers in and around the Capital Region.',
      picture: 'http://homegrowngreat.com/wp-content/uploads/2016/04/Troy-Farmers-Market-2016_fb-profile.jpg',
      createdAt: Moment().subtract(2, 'weeks').toDate()
    });
 
    eventId = Events.collection.insert({
      title: 'Relay 4 Life',
      favorites: 44,
      address: '335 E. Big Beaver Road, Troy',
      description: 'Join us for our first ever Cyclebar Fundraiser to benefit the American Cancer Society and the Relay For Life of Troy',      
      picture: 'https://www.ucumberlands.edu/sites/default/files/styles/large/public/field/image/relay4life.png?itok=dojFtyZR',
      createdAt: Moment().subtract(1, 'days').toDate()
    });
 
    eventId = Events.collection.insert({
      title: 'Halloween costume contest',
      address: 'RPI Student Union, Troy NY',
      favorites: 64,
      description: 'Enter our 2017 Halloween Costume Contest to show off your talent and for a chance to win cash prizes!| Tickets Available for Purchase',
      picture: 'http://i3.mirror.co.uk/incoming/article6752443.ece/ALTERNATES/s615/Lit-jack-o-lanterns-close-up.jpg',
      createdAt: Moment().subtract(2, 'weeks').toDate()
    });

    eventId = Events.collection.insert({
      favorites:  88,
      title: 'Random Event',
      address: 'Unknown Location',
      description: 'We are hosting a random event in the student union. Please please join us',
      picture: null ,
      createdAt: Moment().subtract(2, 'weeks').toDate()
    });
  }
  
});
