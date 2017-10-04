import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';

export default (props) => (
    <Popup basic
           on="click"
           position="bottom right"
           trigger={<Icon name="ellipsis horizontal" />}>
      <Button.Group className="option-buttons" vertical>
        <Button disabled>Add to Mix</Button>
        <Button disabled>Buy</Button>
        <Button disabled>Rate</Button>
        <Button negative onClick={() => props.removeTrackFromMix(props.index)}>Remove</Button>
      </Button.Group>
      <hr />
      <Button.Group className="option-buttons" vertical>
        <Button disabled>Share</Button>
        <Button onClick={() => props.setPreviewTrack(props.mix.tracks[props.index])}>Play</Button>
      </Button.Group>
    </Popup>
);