import { Meteor } from 'meteor/meteor';

import { Mixes } from '../mixes';

Meteor.publish('mixes', function() {
  return Mixes.find();
});

Meteor.publish('publicPublishedMixes', function() {
  return Mixes.find({ $and: [
    {private: false},
    {published: true}
  ]});
});

Meteor.publish('userMixes', function() {
  return Mixes.find({ creator: this.userId });
});