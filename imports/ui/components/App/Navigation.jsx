import { Meteor } from 'meteor/meteor';
import { Menu } from 'semantic-ui-react';
import React from 'react';
import { browserHistory, IndexLink, Link } from 'react-router';

const logout = (event) => {
  event.stopPropagation();
  event.preventDefault();

  Meteor.logout((error) => {
    if(error) {
      console.log(error);
    }

    browserHistory.push('/');
  });
};

export default (props) => (
  <div>
    <Menu pointing secondary>
      <Menu.Item active={props.activePage === '/'} as={IndexLink} className="brand" content="Willow" name="willowMix" to="/" />
      <Menu.Menu position="right">
        {(Meteor.user()) ? 
          <Menu.Item active={props.activePage === '/buildmix'} as={Link} content="Mixer" name="buildmix" to="/buildmix" /> :
          ''
        }
        <Menu.Item active={props.activePage === '/explore'} as={Link} content="Explore" name="expore" to="/explore"/>
        {(!Meteor.user()) ?
          <Menu.Item active={props.activePage === '/login'} as={Link} content="Login" name="login" to="/login" /> :
          <Menu.Item content="Logout" onClick={logout} />
        }
      </Menu.Menu>
    </Menu>
  </div>
);