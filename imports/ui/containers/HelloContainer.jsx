import React from 'react';

import Hello from '../components/Hello/Hello';

export default class HelloContainer extends React.Component { 
  render() {
    return (
      <Hello name={this.props.params.name} food={this.props.location.query.food} />
    );
  }
}