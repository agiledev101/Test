import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

export default (props) => (
  <Modal basic onClose={props.toggle} open={props.open}>
    {(props.mix) ? 
      <Header>Are you sure you would like to delete {props.mix.name}?</Header> :
      <Header>No Mix Selected</Header>
    }
    
    {(props.mix) ?
      <Modal.Actions>
        <Button positive onClick={props.deleteMix}>Yes</Button>
        <Button negative onClick={props.toggle}>No</Button>
      </Modal.Actions> :
      <Modal.Actions>
        <Button onClick={props.toggle}>Return to Mixing Board</Button>
      </Modal.Actions>
    }
  </Modal>
);