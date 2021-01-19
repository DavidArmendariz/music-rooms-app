import React from 'react';

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
      <div>
        <h3>Room Code: {this.roomCode}</h3>
        <p>Votes: {votesToSkip}</p>
        <p>Guest Can Pause: {guestCanPause.toString()}</p>
        <p>Is Host: {isHost.toString()}</p>
      </div>
    );
  }
}
