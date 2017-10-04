import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import App from '../components/App/App';

export default createContainer((props) => {
  if(Meteor.user()) {
    return {
      user: Meteor.user()
    }
  }

  return {
    user: null
  };
}, App);