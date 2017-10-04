import React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';

export default (props) => (
  <Modal basic onClose={props.toggle} open={props.open}>
    <Header>Would you like to save changes to Mix?</Header>
    <Modal.Actions>
      <Button positive onClick={() => props.saveMix(props.nextMixId)}>Yes</Button>
      <Button negative onClick={() => props.discardChanges(props.nextMixId)}>No</Button>
      <Button onClick={props.toggle}>Return to Mixing Board</Button>
    </Modal.Actions>
  </Modal>
);