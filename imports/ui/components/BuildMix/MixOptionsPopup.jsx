import React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';

export default (props) => {
  if (props.activeMix) {
    return (
      <Popup basic
             on="click"
             position="bottom right"
             trigger={<Icon name="ellipsis horizontal" />}>
        <Button.Group className="option-buttons" vertical>
        <Button disabled={(props.activeMix.tracks.reduce((sum, track) => {
                    if (track) {
                      return sum + 1;
                    }

                    return sum;
                  }, 0) < props.activeMix.trackCount && props.activeMix.trackCount < 12)} 
                  onClick={props.addNewTrack}>
            Add a Track
          </Button>
          <Button disabled>Buy</Button>
          <Button disabled>Rate</Button>
          <Button negative onClick={props.toggleConfirmDeleteModal}>Remove</Button>
        </Button.Group>
        <hr />
        <Button.Group className="option-buttons" vertical>
          <Button onClick={props.toggleMixEmailModal}>Share</Button>
          <Button disabled={props.activeMix.tracks.reduce((sum, track) => {
                            if (track){
                              return sum + 1;
                            }

                            return sum;
                          }, 0) < props.activeMix.trackCount}
                  onClick={props.publishMix}>
            Post
          </Button>
          <Button disabled>Play</Button>
        </Button.Group>
      </Popup>
    );
  }

  return ( 
    <div>
    </div>
  );
};