import moment from 'moment';
import React from 'react';
import { Header, Table } from 'semantic-ui-react';

export default (props) => (
  <Table basic="very" className="custom-padded" celled selectable={props.mixes.length > 0}>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign="center">New Mixes</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {(props.mixes.length > 0) ? 
        props.mixes.sort((a, b) => (moment(a.createdDate).isBefore(b.createdDate)) ? 1 : -1).slice(0, 5).map(mix => {
          return (
            <Table.Row active={(props.activeMix && mix._id === props.activeMix._id)}
                       className="cursor-pointer" 
                       key={mix._id}
                       onClick={() => props.setActiveMix(mix._id)}>
              <Table.Cell className="custom-padded-sm"><Header as="h4">{mix.name}</Header> created by {(mix.creator) ? Meteor.users.findOne({_id: mix.creator}).username : 'Unknown'} on {moment(mix.createdDate).format('M/D/YYYY')}</Table.Cell>
            </Table.Row>
          );
        }) :
        <Table.Row>
          <Table.Cell className="custom-padded-sm" textAlign="center">No New Mixes</Table.Cell>
        </Table.Row>
      }
    </Table.Body>
  </Table>
);