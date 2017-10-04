import React from 'react';
import { Button, Form, Icon, Input, Table } from 'semantic-ui-react';

import Pagination from '../App/Pagination';

export default class SearchMixes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: []
    };
    
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.displayTotalDuration = this.displayTotalDuration.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  clearSearchResults() {
    this.refs.searchTerm.inputRef.value = '';

    this.setState(Object.assign({}, this.state, {
      results: []
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

  handleSubmit(event) {
    if (event) event.preventDefault();
    let results = [];

    if(!(this.refs.searchTerm.inputRef.value === null || this.refs.searchTerm.inputRef.value.match(/^ *$/) !== null)) {
      this.props.mixes.forEach(mix => {
        if(Meteor.users.findOne({_id: mix.creator}) && Meteor.users.findOne({_id: mix.creator}).username.toLowerCase() === this.refs.searchTerm.inputRef.value.toLowerCase()) {
          results.push(mix);
          return;
        }

        if(mix.name.toLowerCase().includes(this.refs.searchTerm.inputRef.value.toLowerCase())) {
          results.push(mix);
          return;
        }

        if(mix.tracks.find(track => track.trackName.toLowerCase().includes(this.refs.searchTerm.inputRef.value.toLowerCase()))) {
          results.push(mix);
          return;
        }

        if(mix.tracks.find(track => track.artistName.toLowerCase().includes(this.refs.searchTerm.inputRef.value.toLowerCase()))) {
          results.push(mix);
          return;
        }

        if(mix.tracks.find(track => track.albumName.toLowerCase().includes(this.refs.searchTerm.inputRef.value.toLowerCase()))) {
          results.push(mix);
          return;
        }
      });
    }

    this.setState(Object.assign({}, this.state, {
      results: results
    }));
  }

  render() {
    return (
      <div className="search-mixes">
        <Form onSubmit={this.handleSubmit}>
          <Input icon={<Icon name='search' inverted circular link onClick={this.handleSubmit} />}
                 fluid 
                 placeholder="Enter Mix Name, Song, Artist, or Album..."
                 ref="searchTerm" />
        </Form>
        {(this.state.results.length > 0) ?
          <Table basic="very" className="custom-padded" selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Creator</Table.HeaderCell>
                <Table.HeaderCell>Track Count</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
                <Table.HeaderCell>Rating</Table.HeaderCell>
              </Table.Row> 
            </Table.Header>
            <Table.Body>
              {this.state.results.map(result => {
                return (
                  <Table.Row className="cursor-pointer" 
                             key={result._id}
                             onClick={() => this.props.setActiveMix(result._id)}>
                    <Table.Cell className="custom-padded-sm">{result.name}</Table.Cell>
                    <Table.Cell className="custom-padded-sm">{(Meteor.users.findOne({_id: result.creator})) ? Meteor.users.findOne({_id: result.creator}).username : 'Unknown'}</Table.Cell>
                    <Table.Cell className="custom-padded-sm">{result.trackCount}</Table.Cell>
                    <Table.Cell className="custom-padded-sm">{this.displayTotalDuration(result)}</Table.Cell>
                    <Table.Cell className="custom-padded-sm">{result.rating}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table> :
          ''
        }
        {/* <Pagination items={Array(50)}
                    onChangePage={() => {}} /> */}
        {(this.state.results.length > 0) ?
          <Button onClick={this.clearSearchResults}>Clear Search Results</Button> :
          ''
        }
      </div>
    );
  }
}