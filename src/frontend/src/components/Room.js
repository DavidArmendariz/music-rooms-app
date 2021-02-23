import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.match.params.roomCode;
  }

  componentDidMount() {
    fetch(`/api/get-room?code=${this.roomCode}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  render() {
    const { votesToSkip, guestCanPause, isHost } = this.state;
    return (
      <Grid container justify="center" align="center" direction="column">
        <Grid item>
          <Typography variant="h4">Room Code: {this.roomCode}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Votes: {votesToSkip}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Guest Can Pause: {guestCanPause.toString()}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">Is Host: {isHost.toString()}</Typography>
        </Grid>
        <Grid item>
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Leave Room
          </Button>
        </Grid>
      </Grid>
    );
  }
}
