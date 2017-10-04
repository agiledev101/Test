import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Explore from '../components/Explore/Explore';
import { Mixes } from '../../api/mixes/mixes';

export default createContainer((props) => {
  var mixSub = Meteor.subscribe('publicPublishedMixes');
  var userSub = Meteor.subscribe('usernames');
  
  if(mixSub.ready() && userSub.ready()) {
    return {
        mixes: Mixes.find().fetch(),
        ready: true
      }
  }

  return {
    mixes: [],
    ready: false
  };
}, Explore);