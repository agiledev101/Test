import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import Login from '../components/Login/Login';

export default createContainer((props) => {
  let sub = Meteor.subscribe('userData');
  
  if (sub.ready()) {
    return {
      ready: true,
      returnUrl: props.location.query.returnUrl
    };
  }

  return {
    ready: false,
    returnUrl: props.location.query.returnUrl
  };
}, Login);