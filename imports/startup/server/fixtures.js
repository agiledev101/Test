import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

if (!Meteor.isProduction) {
  const users = [{
    username: 'Admin',
    email: 'admin@admin.com',
    password: 'password',
    profile: {
    },
    roles: ['admin'],
  }];

  users.forEach(({ email, password, profile, roles, username }) => {
    const userExists = Meteor.users.findOne({ 'emails.address': email });

    if (!userExists) {
      const userId = Accounts.createUser({ email, password, profile, username });
      Roles.addUsersToRoles(userId, roles);
    }
  });
}