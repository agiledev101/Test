import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Form, Icon, Input, Modal, Segment, Table } from 'semantic-ui-react';

export default class SearchTrackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addedSongName: null,
      results: [],
      searching: false
    }

    this.displayTrackDuration = this.displayTrackDuration.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  displayTrackDuration(duration) {
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

  componentWillReceiveProps(nextProps) {
    if (!this.props.open) {
      this.setState(Object.assign({}, this.state, {
        addedSongName: null,
        results: [],
        searching: false
      }));
    }
  }

  handleClick(track) {
    this.props.addTrackToMix(track);
    this.setState(Object.assign({}, this.state, {
      addedSongName: track.trackName
    }));
  }

  handleClose() {
    this.setState(Object.assign({}, this.state, {
      addedSongName: null,
      results: [],
      searching: false
    }));

    this.props.toggle();
  }

  handleSubmit(event) {
    if (event) event.preventDefault();

    let term = this.refs.searchTerm.inputRef.value.split(' ');

    if (!(term.length === 1 && term[0] === '')) {
      Meteor.call('searchApple', term.join('+'), function(error, results) {
        if (results.length > 0) {  
          this.setState(Object.assign({}, this.state, {
            results: results,
            searching: true
          }));
        } else {
          this.setState(Object.assign({}, this.state, {
            results: [],
            searching: true
          }));
        }
      }.bind(this));
    }
  }

  render() {
    return (
      <Modal closeIcon={true} onClose={this.handleClose} open={this.props.open}>
        <Form onSubmit={this.handleSubmit}>
          <Input fluid
                 icon={<Icon name='search' inverted circular link onClick={this.handleSubmit} />} 
                 placeholder="Enter Song, Artist, or Album..."
                 ref="searchTerm" />
        </Form>
        {(this.state.searching && this.state.results.length === 0) ? 
          <Table basic="very" className="results-table" selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell as="h4">No results found</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>:
          ''
        }
        {(this.state.addedSongName) ?
          <Segment className="custom-margin" color="green" raised>{this.state.addedSongName} has been added to the Mix</Segment> : ''
        }
        {(this.state.results.length > 0) ?
          <Table basic="very" className="custom-padded" selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Song</Table.HeaderCell>
                <Table.HeaderCell>Artist</Table.HeaderCell>
                <Table.HeaderCell>Album</Table.HeaderCell>
                <Table.HeaderCell>Duration</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.results.map(result=> {
                return (
                  <Table.Row className="cursor-pointer" 
                             key={result.appleTrackId}
                             onClick={() => this.handleClick(result)}>
                    <Table.Cell className="custom-padded-sm">
                      {result.trackName} {(result.explicit) ? ' (Explicit)' : ''}
                    </Table.Cell>
                    <Table.Cell className="custom-padded-sm">{result.artistName}</Table.Cell>
                    <Table.Cell className="custom-padded-sm">{result.albumName}</Table.Cell>
                    <Table.Cell className="custom-padded-sm">
                      {this.displayTrackDuration(result.duration)}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table> :
          ''
        }
      </Modal>
    );
  }
}