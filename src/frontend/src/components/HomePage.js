import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCode: null,
    };
  }

  componentDidMount() {
    fetch('/api/user-in-room')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          roomCode: data.code,
        });
      });
  }

  render() {
    const { roomCode } = this.state;
    if (roomCode) {
      return <Redirect to={`/room/${roomCode}`} />;
    }
    return (
      <Grid container spacing={3} justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h3">House Party</Typography>
        </Grid>
        <Grid item>
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
  }
}
