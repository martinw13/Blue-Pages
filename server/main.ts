//This file defines the server-side actions for the application.
//For now it simply retrieves the events that are already in the collection
//If there are no events in the collection, it simply inserts some sample events

import { Meteor } from 'meteor/meteor';
import * as Moment from 'moment';
import { Events } from '../imports/collections';

Meteor.startup(() => {
  // code to run on server at startup
  if (Events.find({}).cursor.count() === 0) {
    let eventId;
 
    eventId = Events.collection.insert({
      title: 'One For The Team',
      address: '105 Wolf Rd, Albany, NY 12205',
      favorites: 33,
      description: 'Show your team spirit by joining us for a fundraiser to support RPI Racquetball Club. Tell the cashier you\'re supporting the cause to make sure that 50% of the proceeds go to RPI Racquetball Club.',
      picture: 'https://drpma142ptgxf.cloudfront.net/assets/logo.svg',
      createdAt: Moment('12/6/2017 4:00 pm').toDate()
    });
 
    eventId = Events.collection.insert({
      title: 'The 2017 President\'s Holiday Concert',
      address: '44 8th St, Troy, NY 12180',
      favorites: 99,
      description: 'The annual event, a Rensselaer tradition, features performances by the Rensselaer Orchestra under the direction of Arts Lecturer Nicholas DeMaison.  RSVP at: https://webforms.rpi.edu/holiday-concert',      
      picture: 'https://2.bp.blogspot.com/-uobOf2n0E6M/Vvqde5qFjvI/AAAAAAAABLQ/RoY1vZe6whMyu4Vk3v2i_lN4fWQv1yEfQ/s1600/Screen%2BShot%2B2016-03-29%2Bat%2B11.17.05%2BAM.png',
      createdAt: Moment('12/10/2017 3:00 pm').toDate()
    });
  
    eventId = Events.collection.insert({
      title: 'Troy Farmers Market',
      address: '49 4th St, Troy, NY 12181',
      favorites: 77,
      description: 'The Troy Waterfront Farmers Market is delighted to bring you nearly 100 local farmers and fresh food vendors every Saturday, year-round in Downtown Troy, New York. For over 18 years, we have been a leader in supporting local agribusiness and providing a livelihood to farmers and food producers in and around the Capital Region.',
      picture: 'http://homegrowngreat.com/wp-content/uploads/2016/04/Troy-Farmers-Market-2016_fb-profile.jpg',
      createdAt: Moment('12/9/2017 7:00 am').toDate()
    });
 
    eventId = Events.collection.insert({
      title: 'Moe\'s Monday',
      favorites: 110,
      address: '1527 15th St, Troy, NY 12180',
      description: 'Moe\'s Monday..Get a buritto, drink, chips and salsa all for $6.99 plus tax. What a great way to start the week! Please note Moe Monday is not eligible for any other offers or discounts.',      
      picture: 'http://www.wrns.com/wp-content/uploads/2017/01/moes-southwest-grill.jpg',
      createdAt: Moment('12/11/2017 11:00 am').toDate()
    });
 
    eventId = Events.collection.insert({
      title: 'Open Mic Night',
      address: '46 3rd St, Troy, NY 12180',
      favorites: 64,
      description: 'Come show us what you got on the stage!  Open mic night at the Daily Grind. No RSVP required!',
      picture: 'https://res.cloudinary.com/grubhub/image/upload/w_400,h_300,f_auto,fl_lossy,q_80,c_fit/hslevqagv6d4ohouzliz',
      createdAt: Moment('1/8/2018 8:00 pm').toDate()
    });
  }
  
});
