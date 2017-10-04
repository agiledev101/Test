import { Meteor } from 'meteor/meteor';

Meteor.publish('userData', function() {
  return Meteor.users.find({_id: this.userId}, {profile: 1});
});

Meteor.publish('usernames', function() {
  return Meteor.users.find({}, {username: 1});
})