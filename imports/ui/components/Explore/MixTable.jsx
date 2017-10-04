import React from 'react';
import { Button, Popup, Table } from 'semantic-ui-react';

export default (props) => (
  <Table basic="very" className="custom-padded" selectable>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Song</Table.HeaderCell>
        <Table.HeaderCell>Artist</Table.HeaderCell>
        <Table.HeaderCell>Album</Table.HeaderCell>
        <Table.HeaderCell>Duration</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    {(props.mix) ?
      <Table.Body>
        {props.mix.tracks.map((track, index) => {
          return (
            <Popup basic
                    key={index}
                    on="click"
                    position="bottom right"
                    trigger={
                      <Table.Row className="cursor-pointer">
                        <Table.Cell className="custom-padded-sm">
                          {track.trackName} {(track.explicit) ? ' (Explicit)' : ''}
                        </Table.Cell>
                        <Table.Cell className="custom-padded-sm">{track.artistName}</Table.Cell>
                        <Table.Cell className="custom-padded-sm">{track.albumName}</Table.Cell>
                        <Table.Cell className="custom-padded-sm">
                          {displayTrackDuration(track.duration)}
                        </Table.Cell>
                      </Table.Row>
                    }>
              <Button.Group vertical>
                <Button disabled>Preview track</Button>
              </Button.Group>
            </Popup>
          );
        })}
      </Table.Body> : 
      <Table.Body></Table.Body>
    }
  </Table>
);

function displayTrackDuration(duration) {
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