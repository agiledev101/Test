import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import Home from '../components/Home/Home';

export default createContainer((props) => {
  if(Meteor.user()) {
    return {
      user: Meteor.user()
    }
  }

  return {
    user: null
  };
}, Home);