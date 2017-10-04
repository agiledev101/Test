import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import moment from 'moment';
import React from 'react';
import { Button, Checkbox, Form, Modal } from 'semantic-ui-react';

export default class MixEmailModal extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let mix = {
        }

        Meteor.call('addMix123', mix, function(error, mixId) {
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
                <label>Email</label>
                <input name="name" placeholder='Email' />
              </Form.Field>
              <Button type='submit'>Send</Button>
            </Form>
          </Modal>
    );
}
}