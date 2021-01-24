import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';

export default class CreateRoomPage extends React.Component {
  defaultVotes = 2;

  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: true,
      votesToSkip: this.defaultVotes,
    };

    this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
  }

  handleVotesChange(event) {
    this.setState({
      votesToSkip: event.target.value,
    });
  }

  handleGuestCanPauseChange(event) {
    this.setState({
      guestCanPause: event.target.value === 'true',
    });
  }

  handleRoomButtonPressed() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch('/api/create-room', requestOptions)
      .then((response) => response.json())
      .then((data) => this.props.history.push(`/room/${data.code}`));
  }

  render() {
    return (
      <Grid container justify="center" align="center" direction="column" spacing={1}>
        <Grid item>
          <Typography component="h4" variant="h4">
            Create A Room
          </Typography>
        </Grid>
        <Grid container item justify="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">Guest control of playback state</div>
            </FormHelperText>
            <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container item justify="center">
          <FormControl>
            <TextField
              required
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: 'center' },
              }}
            />
            <FormHelperText>
              <div align="center">Votes required to skip song</div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={this.handleRoomButtonPressed}>
            Create A Room
          </Button>
        </Grid>
        <Grid item>
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    );
  }
}
