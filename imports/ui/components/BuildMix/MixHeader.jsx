import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';
import React from 'react';
import { Form, Grid, Header, Icon, Popup, Progress } from 'semantic-ui-react';

import MixOptionsPopup from './MixOptionsPopup';

export default class MixHeader extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      editingName: false
    }

    this.addMix = this.addMix.bind(this);
    this.displayTotalDuration = this.displayTotalDuration.bind(this);
    this.getPercent = this.getPercent.bind(this);
    this.toggleEditingName = this.toggleEditingName.bind(this);
    this.updateMixName = this.updateMixName.bind(this);
  }

  addMix(event) {
    event.preventDefault();
    
    if (event.target.name.value) {
      let mix = {
        _id: Random.id(),
        name: event.target.name.value,
        tracks: [],
        trackCount: 8,
        private: false,
        published: false,
        rating: 0,
        tags: [],
        creator: (Meteor.user()) ? Meteor.userId() : null,
        createdDate: moment().utc().toISOString(),
        lastUpdate: null
      }
      
      Meteor.call('addMix', mix, (error, mixId) => {
        if (error) {
          console.log(error);
        } else {
          this.props.setActiveMix(mix._id);
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, this.state, {
      editingName: false
    }));
  }

  displayTotalDuration(mix) {
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

  getPercent(mix) {
    return (mix.tracks.reduce((sum, track) => {
      if (track) {
        return sum + 1;
      }
  
      return sum;
    }, 0)/mix.trackCount) * 100;
  }

  toggleEditingName() {
    this.setState(Object.assign({}, this.state, {
      editingName: !this.state.editingName
    }));
  }

  updateMixName(event) {
    event.preventDefault();

    Meteor.call('updateMixName', this.props.mix._id, event.target.name.value, (error, result) => {
      if (!error) {
        this.props.setActiveMix(this.props.mix._id);
      }
    });
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          {(this.state.editingName || !this.props.mix) ? 
            <Form onSubmit={(this.props.mix) ? this.updateMixName : this.addMix}>
              <Form.Field>
                <input autoFocus 
                      className="mix-name-input" 
                      defaultValue={(this.props.mix) ? this.props.mix.name : ''} 
                      name="name"
                      placeholder={(this.props.mix) ? this.props.mix.name : 'New Mix'} />
                <Icon className="cursor-pointer" name="remove" onClick={this.toggleEditingName} />
              </Form.Field>
            </Form>:
            <Header as="h2" className="cursor-pointer" onClick={this.toggleEditingName}>{this.props.mix.name}</Header>
          }
        </Grid.Column>
        {(this.props.mix) ?
          <Grid.Column width={1}>
            <MixOptionsPopup activeMix={this.props.mix}
                             addNewTrack={this.props.addNewTrack}
                             publishMix={this.props.publishMix}
                             toggleConfirmDeleteModal={this.props.toggleConfirmDeleteModal}
                             toggleMixEmailModal={this.props.toggleMixEmailModal} />
          </Grid.Column> :
          ''
        }
        {(this.props.mix) ?
          <Grid.Row>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column className="center aligned" width={4}>
              <Grid.Row>
                <Popup  basic
                        content={this.props.mix.tracks.reduce((sum, track) => {
                                  if (track) {
                                    return sum + 1;
                                  }
    
                                  return sum;            
                                }, 0) + '/' + this.props.mix.trackCount + ' songs - ' + this.displayTotalDuration(this.props.mix)}
                        position="top center"
                        trigger={<Progress percent={this.getPercent(this.props.mix)}
                                           size="small"
                                           success={(this.getPercent(this.props.mix) === 100)}
                                           warning={(this.getPercent(this.props.mix) !== 100 && this.getPercent(this.props.mix) > 50)} />}/>
                
              </Grid.Row>
              <Grid.Row>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column className="center aligned" width={4}>
              Created by: {(Meteor.users.findOne({_id: this.props.mix.creator})) ? Meteor.users.findOne({_id: this.props.mix.creator}).username : 'Unknown'}
            </Grid.Column>
            <Grid.Column className="center aligned" width={4}>
              Created on: {moment(this.props.mix.createdDate).format('M/D/YYYY')}
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
          </Grid.Row>
          : ''
        }
      </Grid>
    );
  }
}