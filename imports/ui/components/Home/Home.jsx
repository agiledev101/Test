import { Button, Container, Grid, Header } from 'semantic-ui-react';
import React from 'react';
import { browserHistory } from 'react-router';

function handleBuildMixClick(event) {
  event.stopPropagation();

  browserHistory.push("/buildmix");
}

function handleWillowMixClick(event) {
  event.stopPropagation();

  browserHistory.push("/willowmix");
}

export default ({ready, user}) => (
  <div>
    {(user) ? 
      <Container className="white-text" textAlign="right">Welcome {user.username}</Container> :
      ''
    }
    <Grid columns={2}>
      <Grid.Row className="homeRow">
        {/*<Grid.Column>
          <Container textAlign="center">
            <Button className="green homeButton" content="Willow Mix" onClick={handleWillowMixClick} />
          </Container>
        </Grid.Column>*/}
        {/* <Grid.Column width={16}>
          <Container textAlign="center">
            <Button className="blue homeButton" content="Build a Mix" onClick={handleBuildMixClick} />
          </Container>
        </Grid.Column> */}
      </Grid.Row>
    </Grid>
    <Container className="homeRow" textAlign="center">
      <Header as="h1" className="white-text">Own The Music</Header>
    </Container>
  </div>
);