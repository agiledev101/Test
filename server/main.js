import { Meteor } from 'meteor/meteor';

import '../imports/api/mixes/methods';
import '../imports/api/mixes/server/publications';
import '../imports/api/musicServices/methods';
import '../imports/api/userData/server/publications';
import '../imports/api/userData/methods.js';
import '../imports/startup/server';

Meteor.startup(() => {
  // code to run on server at startup
});
