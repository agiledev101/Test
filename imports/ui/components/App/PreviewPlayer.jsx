import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

export default class PreviewPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      preview: (props.previewTrack) ? new buzz.sound(props.previewTrack.applePreviewUrl, {volume: 50}) : null,
      previewTrack: props.previewTrack,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.previewTrack && nextProps.previewTrack.applePreviewUrl !== this.props.previewTrack.applePreviewUrl) {
      this.state.preview.stop();
      
      this.setState(Object.assign({}, this.state, {
        preview: new buzz.sound(nextProps.previewTrack.applePreviewUrl, {volume: 50}),
        previewTrack: nextProps.previewTrack
      }));
    } else {
      if (!nextProps.previewTrack) {
        if (this.state.preview) {
          this.state.preview.stop();
        }

        this.setState(Object.assign({}, this.state, {
          preview: null,
          previewTrack: null
        }));
      }
    }
  }

  componentWillUnmount() {
    this.state.preview.stop();
  }

  render() {
    if (this.state.preview) {
      this.state.preview.play();
    }

    return (
      <Grid>
        <Grid.Column width={4}>
        </Grid.Column>
        <Grid.Column className="center aligned" width={8}>
          <Grid.Row className="preview-buttons">
            <Icon className="cursor-pointer" name="play" onClick={() => this.state.preview.play()}></Icon>
            <Icon className="cursor-pointer" name="pause" onClick={() => this.state.preview.pause()}></Icon>
            <Icon className="cursor-pointer" name="stop" onClick={() => {
              this.state.preview.stop();
              this.props.setPreviewTrack(null);
            }}></Icon> 
          </Grid.Row>
          <Grid.Row>
            {this.state.previewTrack.trackName} {(this.state.previewTrack.explicit) ? ' (Explicit)' : ''} by {this.state.previewTrack.artistName}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={4}>
        </Grid.Column>
      </Grid>
    );
  }
}