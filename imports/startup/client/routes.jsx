import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';

import AppContainer from '../../ui/containers/AppContainer';
import BuildMixContainer from '../../ui/containers/BuildMixContainer';
import ExploreContainer from '../../ui/containers/ExploreContainer';
import HelloContainer from '../../ui/containers/HelloContainer';
import HomeContainer from '../../ui/containers/HomeContainer';
import LoginContainer from '../../ui/containers/LoginContainer';
import NotFoundContainer from '../../ui/containers/NotFoundContainer';
import RegisterContainer from '../../ui/containers/RegisterContainer';
import WillowMixContainer from '../../ui/containers/WillowMixContainer';

const authenticate = () => {
  if(!Meteor.user()) {
      //browserHistory.push('/login?returnUrl=' + location.pathname);
      browserHistory.push('/login?returnUrl=' + location.href);
  }
};

const redirectLoggedInUser = () => {
  // console.log(!Meteor.user())
  // if(Meteor.user()) {
  //   browserHistory.push('/buildMix');
  // }
};

Meteor.startup( () => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={HomeContainer} />
        <Route path="/buildmix" component={BuildMixContainer} onEnter={authenticate} />
        <Route path="/explore" component={ExploreContainer} onEnter={authenticate} />
        <Route path="/willowmix" component={WillowMixContainer} onEnter={authenticate} />
        <Route path="/login" component={LoginContainer}/>
        {/* <Route path="/register" component={RegisterContainer} onEnter={authenticate} /> */}
        {/* <Route path="/hello/:name" component={HelloContainer} />  */}
        <Route path="*" component={NotFoundContainer} />
      </Route>
    </Router>,
    document.getElementById('app')
  );
});