import React from 'react';
import { Table } from 'semantic-ui-react';

export default class MixListTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    return (
      <div className="custom-padded">
        <h4>{this.props.header}</h4>
        <hr />
        <div className="scrollable-small">
          <Table basic="very" selectable={this.props.mixes.length > 0}>
            <Table.Body>
              {(this.props.mixes.length > 0) ? 
                this.props.mixes.sort((a, b) => {
                  if (a.name > b.name) return 1;

                  return -1;
                }).map(mix => {
                  return (
                    <Table.Row active={(this.props.activeMix && mix._id === this.props.activeMix._id)} className="cursor-pointer" 
                              key={mix._id}
                              onClick={() => this.props.setActiveMix(mix._id)}>
                      <Table.Cell className="custom-padded-sm">{mix.name}</Table.Cell>
                    </Table.Row>
                  );
                }) :
                <Table.Row>
                  <Table.Cell className="custom-padded-sm" textAlign="center">{this.props.noMixDescription}</Table.Cell>
                </Table.Row>
              }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
    
}
 componentDidMount()
 {
    this.props.selectMix();
 }
}