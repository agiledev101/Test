import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

import TrackOptionsPopup from './TrackOptionsPopup';

export default (props) => (
  <Table basic="very" className="custom-padded">
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
        {[...Array(props.mix.trackCount)].map((el, index) => {
          if (props.mix.tracks[index]) {
            return (
              <Table.Row className="cursor-pointer custom-row" key={index} onClick={() => props.setPreviewTrack(props.mix.tracks[index])}>
                <Table.Cell className="custom-padded-sm">
                  {props.mix.tracks[index].trackName} {(props.mix.tracks[index].explicit) ? ' (Explicit)' : ''}
                </Table.Cell>
                <Table.Cell className="custom-padded-sm">{props.mix.tracks[index].artistName}</Table.Cell>
                <Table.Cell className="custom-padded-sm">{props.mix.tracks[index].albumName}</Table.Cell>
                <Table.Cell className="custom-padded-sm">
                  {displayTrackDuration(props.mix.tracks[index].duration)}
                </Table.Cell>
                <Table.Cell onClick={(event) => event.stopPropagation()}>
                  <TrackOptionsPopup index={index}
                                     mix={props.mix}
                                     removeTrackFromMix={props.removeTrackFromMix}
                                     setPreviewTrack={props.setPreviewTrack} />
                </Table.Cell>
              </Table.Row>
            );
          }

          return (
            <Table.Row className={(index === props.trackIndex) ? 'active-track cursor-pointer custom-row' : 'cursor-pointer custom-row'} key={index}>
              <Table.Cell className="custom-padded-sm"
                          colSpan={4}
                          onClick={() => {
                            if (props.searching) {
                              props.setTrackIndex(index);
                            } else {
                              props.toggleSearching(index);
                            }
                          }}
                          textAlign="center">
                <Icon color="green"
                      name='plus'
                      onClick={() => {
                        if (props.searching) {
                          props.setTrackIndex(index);
                        } else {
                          props.toggleSearching(index);
                        }
                      }} />
              </Table.Cell>
              {(index > 7) ?
                <Table.Cell>
                  <Icon color="red"
                        name="minus"
                        onClick={() => props.removeTrackFromMix(props.index)} />
                </Table.Cell>:
                null
              }
            </Table.Row>
          );
        })}
      </Table.Body> : 
      <Table.Body>   
        {[...Array(8)].map((el, index) => {
          return (
            <Table.Row key={index}>
              <Table.Cell className="custom-padded-sm"
                          colSpan={4}
                          onClick={() => {
                            if (props.searching) {
                              props.setTrackIndex(index);
                            } else {
                              props.toggleSearching(index);
                            }
                          }}
                          textAlign="center">
                <Icon color="green"
                      name='plus'
                      onClick={() => {
                        if (props.searching) {
                          props.setTrackIndex(index);
                        } else {
                          props.toggleSearching(index);
                        }
                      }} />
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
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