import React from 'react';

import Navigation from './Navigation';

export default App = ({children, location}) => (
  <div>
    <Navigation activePage={location.pathname} user={Meteor.user()} />
    {children}
  </div>
);