import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Button, Form, Grid, Header, Input, Message } from 'semantic-ui-react';

export default class Register extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      error: false,
      errorMessage: '',
      errorType: '',
    }

    this.registerUser = this.registerUser.bind(this);
  }
  
  registerUser(event) {
    event.preventDefault();

    const email = event.target.email.value
    const password = event.target.password.value;
    const username = event.target.username.value;
    const userProfile = { };

    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: userProfile
    }, (error) => {
      if(error) {
        this.setState({
          error: true,
          errorMessage: error.reason,
          errorType: (error.reason.toLowerCase().includes('username')) ? 'username' :
                     (error.reason.toLowerCase().includes('email')) ? 'email' :
                     (error.reason.toLowerCase().includes('password')) ? 'password' :
                     ''
        });
      }
      else {
        Meteor.loginWithPassword(email, password);

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
          <Header as="h2">Register</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={10}>
            <Form error={this.state.error} onSubmit={this.registerUser}>
              <Message className="form-error" content={this.state.errorMessage} error />
              <Form.Field control={Input} error={(this.state.errorType === 'username')} label="Username" name="username" placeholder="Username" type="text" />
              <Form.Field control={Input} error={(this.state.errorType === 'email')} label="Email" name="email" placeholder="Email Address" type="text" />
              <Form.Field control={Input} error={(this.state.errorType === 'password')} label="Password" name="password" placeholder="Password" type="password" />
              <Form.Field content="Register" control={Button} type="submit" />
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

