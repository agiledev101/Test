import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import React from 'react';
import { Dimmer, Grid, Header, Loader, List} from 'semantic-ui-react';

import HighestRatedMixTable from './HighestRatedMixTable';
import MixHeader from './MixHeader';
import MixTable from './MixTable';
import NewMixTable from './NewMixTable';
import SearchMixes from './SearchMixes';

export default class Explore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMix: null
    };

    this.setActiveMix = this.setActiveMix.bind(this);
  }

  setActiveMix(mixId) {
    this.setState(Object.assign({}, this.state, {
      activeMix: JSON.parse(JSON.stringify(this.props.mixes.find(mix => mix._id === mixId)))
    }));
  }

  render() {
    return (
      <Grid className="page-content">
        <Grid.Row>
          <Header as="h1">Explore</Header>
        </Grid.Row>
        {(this.props.ready) ?
          <Grid.Row>
            <Grid.Column width={4}>
              <NewMixTable activeMix={this.state.activeMix}
                           mixes={this.props.mixes}
                           setActiveMix={this.setActiveMix} />
              <HighestRatedMixTable activeMix={this.state.activeMix}
                                    mixes={this.props.mixes}
                                    setActiveMix={this.setActiveMix} />
            </Grid.Column>
            <Grid.Column width={12}>
              <SearchMixes mixes={this.props.mixes}
                           setActiveMix={this.setActiveMix} />
              {(this.state.activeMix) ? 
                <MixHeader mix={this.state.activeMix} /> :
                ''
              }

              {(this.state.activeMix) ?
                <MixTable mix={this.state.activeMix} /> :
                ''
              }
            </Grid.Column>
          </Grid.Row> :
          <Grid.Row>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Grid.Row>
        }
      </Grid>
    );
  }
}