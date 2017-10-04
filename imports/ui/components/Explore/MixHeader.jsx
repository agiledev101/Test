import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

export default (props) => (
  <Grid>
    <Header as="h2">{(props.mix) ? props.mix.name : 'Choose a Mix'}</Header>
    {(props.mix) ?
      <Grid.Row>
        <Grid.Column width={2}></Grid.Column>
        <Grid.Column className="center aligned" width={4}>
          Duration: {displayTotalDuration(props.mix)}
        </Grid.Column>
        <Grid.Column className="center aligned" width={4}>
          Created by: {(Meteor.users.findOne({_id: props.mix.creator})) ? Meteor.users.findOne({_id: props.mix.creator}).username : 'Unknown'}
        </Grid.Column>
        <Grid.Column className="center aligned" width={4}>
          Created on: {moment(props.mix.createdDate).format('M/D/YYYY')}
        </Grid.Column>
        <Grid.Column width={2}></Grid.Column>
      </Grid.Row>
      : ''
    }
  </Grid>
);

function displayTotalDuration(mix) {
  const duration = mix.tracks.reduce((sum, track) => {
    if (track) {
      return sum + track.duration;
    }
    
    return sum;
  }, 0);
  let durationString = '0:00'
  
  if (duration > 0) {
    let minutes = parseInt((duration / 1000) / 60);
    let seconds = parseInt((duration / 1000) % 60);

    if (minutes > 59) {
      let hours;

      hours = parseInt(minutes / 60);
      minutes = parseInt(minutes % 60);
      durationString = hours.toString() + ':' + ((minutes < 10) ?  '0' + minutes.toString() : minutes.toString()) + ':' + ((seconds < 10) ? '0' + seconds.toString() : seconds.toString());
    } else {
      durationString = minutes.toString() + ':' + ((seconds < 10) ? '0' + seconds.toString() : seconds.toString());
    }
  }

  return durationString;
}