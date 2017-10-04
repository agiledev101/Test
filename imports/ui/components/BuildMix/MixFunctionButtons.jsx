import React from 'react';
import { Button, Container } from 'semantic-ui-react';

export default (props) => {
  if (props.activeMix) {
    return (
      <Container className="custom-padded center aligned">
        <Button disabled>Share</Button>
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
      </Container>
    );
  }

  return ( 
    <Container className="custom-padded">
    </Container>
  );
};