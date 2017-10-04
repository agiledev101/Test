import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

import BuildMix from '../components/BuildMix/BuildMix';
import { Mixes } from '../../api/mixes/mixes';

export default createContainer((props) => {
  let mixSub = Meteor.subscribe('userMixes');
  
  if (mixSub.ready()) {
    return {
      mixes: Mixes.find().fetch(),
      ready: true
    };
  }
  
  return {
    mixes: [],
    ready: false
  };
}, BuildMix);