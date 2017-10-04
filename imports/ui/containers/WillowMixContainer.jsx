import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import WillowMix from '../components/WillowMix/WillowMix';

export default createContainer((props) => {
  if(Meteor.user()) {
    return {
      user: Meteor.user()
    }
  }

  return {
    user: null
  };
}, WillowMix);