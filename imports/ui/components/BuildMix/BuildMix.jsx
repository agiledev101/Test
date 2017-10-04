import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Button, Dimmer, Grid, Header, Loader } from 'semantic-ui-react';

import ConfirmDeleteModal from './ConfirmDeleteModal';
import ConfirmLeaveModal from './ConfirmLeaveModal';
import MixFunctionButtons from './MixFunctionButtons';
import MixHeader from './MixHeader';
import MixListTable from './MixListTable';
import MixTable from './MixTable';
import NewMixModal from './NewMixModal';
import MixEmailModal from './MixEmailModal';
import PreviewPlayer from '../App/PreviewPlayer';
import SearchTable from './SearchTable';

export default class BuildMix extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMix: null,
      displayConfirmDeleteModal: false,
      displayNewMixModal: false,
      displayMixEmailModal:false,
      nextMixId: null,
      previewTrack: null,
      searching: false,
      trackIndex: null
    }

    this.addNewTrack = this.addNewTrack.bind(this);
    this.addTrackToMix = this.addTrackToMix.bind(this);
    this.deleteMix = this.deleteMix.bind(this);
    this.publishMix = this.publishMix.bind(this);
    this.removeTrackFromMix= this.removeTrackFromMix.bind(this);
    this.setActiveMix = this.setActiveMix.bind(this);
    this.setPreviewTrack = this.setPreviewTrack.bind(this);
    this.setTrackIndex = this.setTrackIndex.bind(this);
    this.toggleConfirmDeleteModal = this.toggleConfirmDeleteModal.bind(this);
    this.toggleNewMixModal = this.toggleNewMixModal.bind(this);
    this.toggleMixEmailModal = this.toggleMixEmailModal.bind(this);
    this.toggleSearching = this.toggleSearching.bind(this);

      // Customize code
    this.selectMix = this.selectMix.bind(this);
    this.getParameterByName = this.getParameterByName.bind(this);
    
  }
  
  
  selectMix()
  {
      //Meteor.call('readMailgunSettings',(error, result) => {
      //    alert(result+result.MAIL_URL)
      //});

      //var mixId = this.getParameterByName('mixId');      
      //this.setActiveMix(mixId)
  }
  getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  addNewTrack() {
    if (this.state.activeMix.trackCount < 12) {
      let mix = JSON.parse(JSON.stringify(this.state.activeMix));

      mix.trackCount = mix.trackCount + 1;
      
      Meteor.call('saveMix', mix, (error, result) => {
        if (!error) {
          this.setState(Object.assign({}, this.state, {
            activeMix: mix,
            trackIndex: null
          }));
        }
      });
    }
  }

  addTrackToMix(track) {
    let trackIndex = null;
    let mix = JSON.parse(JSON.stringify(this.state.activeMix));

    if (track) {
      mix.tracks[this.state.trackIndex] = track;
    }

    if (this.state.trackIndex + 1 < this.state.activeMix.trackCount) {
      for(let i = 0; i < this.state.activeMix.trackCount; i++) {
        trackIndex = (!mix.tracks[i] && (trackIndex === null || i > this.state.trackIndex && trackIndex < this.state.trackIndex)) ? i : trackIndex;
      }
    } else {
      for (let i = 0; i < this.state.activeMix.trackCount; i++) {
        trackIndex = (!mix.tracks[i] && trackIndex === null) ? i : trackIndex;
      }
    }

    Meteor.call('saveMix', mix, (error, result) => {
      if (!error) {
        if (trackIndex === null) {
          this.setState(Object.assign({}, this.state, {
            activeMix: mix,
            searching: false,
            trackIndex: trackIndex
          }));
        } else {
          this.setState(Object.assign({}, this.state, {
            activeMix: mix,
            trackIndex: trackIndex
          }));
        }
      }
    });
  }

  deleteMix() {
    if (this.state.activeMix) {
      Meteor.call('deleteMix', this.state.activeMix._id, (error) => {
        if (!error) {
          this.setState(Object.assign({}, this.state, {
            activeMix: null,
            displayConfirmDeleteModal: false,
            nextMixId: null,
            previewTrack: null,
            searching: false,
            trackIndex: null
          }));
        }
      });
    }
  }

  publishMix() {
    if (this.state.activeMix) {
      let mix = JSON.parse(JSON.stringify(this.state.activeMix));
      mix.published = true;

      Meteor.call('saveMix', mix, (error, result) => {
        if (!error) {
          this.setState(Object.assign({}, this.state, {
            activeMix: mix,
            displayConfirmDeleteModal: false,
            displayNewMixModal: false,
            nextMixId: null,
            searching: false,
            trackIndex: null
          }));
        }
      });
    }
  }

  removeTrackFromMix(trackIndex) {
    let mix = JSON.parse(JSON.stringify(this.state.activeMix));
    let previewTrack = this.state.previewTrack;

    if (previewTrack && mix.tracks[trackIndex].applePreviewUrl === previewTrack.applePreviewUrl) {
      previewTrack = null;
    }

    if (mix) {
      if (trackIndex !== null) {
        mix.tracks[trackIndex] = null;
      }

      if (mix.trackCount > 8) {
        mix.trackCount = mix.trackCount - 1;
      }
    }
    
    Meteor.call('saveMix', mix, (error, result) => {
      if (!error) {
        if (previewTrack) {
          this.setState(Object.assign({}, this.state, {
            activeMix: mix,
          }));
        }
        else {
          this.setState(Object.assign({}, this.state, {
            activeMix: mix,
            previewTrack: null
          }));
        }
      }
    });
  }

  setActiveMix(mixId) {    
    this.setState(Object.assign({}, this.state, {
      activeMix: this.props.mixes.find(mix => mix._id === mixId),
      previewTrack: null
    }));
  }

  setPreviewTrack(track) {
    console.log('here');
    this.setState(Object.assign({}, this.state, {
      previewTrack: track
    }));
  }

  setTrackIndex(index) {
    if (index < this.state.activeMix.trackCount) {
      this.setState(Object.assign({}, this.state, {
        trackIndex: index
      }));
    } else {
      this.setState(Object.assign({}, this.state, {
        trackIndex: 0
      }));
    }
  }

  toggleConfirmDeleteModal(mixId) {
    this.setState(Object.assign({}, this.state, {
      displayConfirmDeleteModal: !this.state.displayConfirmDeleteModal,
      previewTrack: null
    }));
  }

  toggleNewMixModal() {
    this.setState(Object.assign({}, this.state, {
      displayNewMixModal: !this.state.displayNewMixModal,
      previewTrack: null
    }));
  } 

  toggleMixEmailModal() {
      this.setState(Object.assign({}, this.state, {
          displayMixEmailModal: !this.state.displayMixEmailModal,
          displayNewMixModal: false
      }));
      // Work around to close popup
      document.getElementsByClassName('popup')[0].style="display:none !important"
  }

  toggleSearching(index) {
    if (index !== null) {
      this.setState(Object.assign({}, this.state, {
        searching: true,
        trackIndex: index
      }));
    } else {
      this.setState(Object.assign({}, this.state, {
        searching: false,
        trackIndex: null
      }));
    }
    
  }

  render() {
    return (
      <Grid className="page-content">
        <Grid.Row>
          <Header as="h1">Mixer</Header>
        </Grid.Row>
        {(this.props.ready) ? 
          <Grid.Row>
            {(this.state.searching) ?
              <Grid.Column className="center aligned" width={8}>
                <SearchTable addTrackToMix={this.addTrackToMix}
                             setPreviewTrack={this.setPreviewTrack}
                             toggleSearching={this.toggleSearching} />
              </Grid.Column> :
              <Grid.Column className="center aligned" width={4}>
                <Button onClick={this.toggleNewMixModal} size="small">New Mix</Button>
                <MixListTable activeMix={this.state.activeMix}
                              header={'In-Progress'}
                              mixes={this.props.mixes.filter(mix => {
                                if (mix.tracks.reduce((sum, track) => {
                                  if (track) {
                                    return sum + 1;
                                  }
                                  
                                  return sum;
                                }, 0) < mix.trackCount) {
                                  return true;
                                }

                                return false;
                              })}
                              noMixDescription={'No In-Progress Mixes'}
                              selectMix={this.selectMix}
                              setActiveMix={this.setActiveMix} />
                <MixListTable activeMix={this.state.activeMix}
                              header={'Mixes'}
                              mixes={this.props.mixes}
                              noMixDescription={'No Mixes'}
                              selectMix={this.selectMix}
                              setActiveMix={this.setActiveMix} />
                <MixListTable activeMix={this.state.activeMix}
                              header={'Posted'}
                              mixes={this.props.mixes.filter(mix => mix.published)}
                              noMixDescription={'No Posted Mixes'}
                              selectMix={this.selectMix}
                              setActiveMix={this.setActiveMix} />
                <NewMixModal open={this.state.displayNewMixModal}
                toggle={this.toggleNewMixModal} />
                <MixEmailModal open={this.state.displayMixEmailModal}
                toggle={this.toggleMixEmailModal} />
              </Grid.Column>
            }
            <Grid.Column width={(this.state.searching) ? 8 : 12}>
              <MixHeader addNewTrack={this.addNewTrack}
                         mix={this.state.activeMix}
                         publishMix={this.publishMix}
                         setActiveMix={this.setActiveMix}
                         toggleMixEmailModal={this.toggleMixEmailModal}
                         toggleConfirmDeleteModal={this.toggleConfirmDeleteModal} />
              {(this.state.previewTrack) ?
                <PreviewPlayer previewTrack={this.state.previewTrack}
                               setPreviewTrack={this.setPreviewTrack} /> :
                ''
              }
              <MixTable mix={this.state.activeMix}
                        removeTrackFromMix={this.removeTrackFromMix}
                        searching={this.state.searching}
                        setPreviewTrack={this.setPreviewTrack}
                        setTrackIndex={this.setTrackIndex}
                        toggleSearching={this.toggleSearching}
                        trackIndex={this.state.trackIndex} />
              <MixFunctionButtons activeMix={this.state.activeMix}
                                  addNewTrack={this.addNewTrack}
                                  discardChanges={this.discardChanges}
                                  publishMix={this.publishMix}
                                  saveMix={this.saveMix}
                                  toggleConfirmDeleteModal={this.toggleConfirmDeleteModal} />
            </Grid.Column>
          </Grid.Row> :
          <Grid.Row>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Grid.Row>
        }
        <ConfirmDeleteModal deleteMix={this.deleteMix}
                            mix={this.state.activeMix}
                            open={this.state.displayConfirmDeleteModal}
                            toggle={this.toggleConfirmDeleteModal} />
      </Grid>
    );
}
  
}