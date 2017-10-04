import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Button, Dimmer, Form, Grid, Header, Input, Loader, Message } from 'semantic-ui-react';

export default class Login extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      error: false,
    }

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ready && Meteor.user()) {
      //location.href = '/buildMix';
    }
  }
  
  handleLogin(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    Meteor.loginWithPassword(username, password, (error) => {
      if(error) {
        this.setState({
          error: true
        });
      }
      else {
        if(this.props.returnUrl) {
          browserHistory.push(this.props.returnUrl);
        } else {
          browserHistory.push('/');
        }
      }
    });
  };
  
  render() {
    return (
      <Grid className="page-content">
        <Grid.Row>
          <Header as="h1">Log in</Header>
        </Grid.Row>
        {(this.props.ready) ?
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
              <Form error={this.state.error} onSubmit={this.handleLogin}>
                <Message error content="Invalid Username/Email or Password"/> 
                <Form.Field control={Input} label="Username/Email" name="username" placeholder="Username or Email Address" type="text" />
                <Form.Field control={Input} label="Password" name="password" placeholder="Password" type="password" />
                <Form.Field control={Button} type="submit" content="Login" />
                {/* <span>or </span><Link to={(this.props.returnUrl) ? '/register?returnUrl=' + this.props.returnUrl : '/register'}>Register</Link> */}
              </Form>
            </Grid.Column>
          </Grid.Row> :
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        }
      </Grid>
    );
  }
}

