import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';
import React from 'react';
import { Button, Checkbox, Form, Modal } from 'semantic-ui-react';

export default class NewMixModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let mix = {
      _id: Random.id(),
      name: event.target.name.value,
      tracks: [],
      trackCount: 8,
      private: (event.target.private) ? event.target.private.checked : false,
      published: false,
      rating: 0,
      tags: [],
      creator: (Meteor.user()) ? Meteor.userId() : null,
      createdDate: moment().utc().toISOString(),
      lastUpdate: null
    }
    
    Meteor.call('addMix', mix, function(error, mixId) {
      if (error) {
        console.log(error);
      } else {
        this.props.toggle();
      }
    }.bind(this));
  }

  render() {
    return (
      <Modal closeIcon={true} onClose={this.props.toggle} open={this.props.open}>
        <Form className="custom-padded" onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Mix Name</label>
            <input name="name" placeholder='Mix Name' />
          </Form.Field>
          {(Meteor.user()) ? 
            <Form.Field>
              <Checkbox label='Private Mix' name="private" />
            </Form.Field> :
            ''
          }
          <Button type='submit'>Save</Button>
        </Form>
      </Modal>
    );
  }
}