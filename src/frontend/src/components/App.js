import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HomePage from './HomePage';
import RoomJoinPage from './RoomJoinPage';
import CreateRoomPage from './CreateRoomPage';
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/join" component={RoomJoinPage} />
            <Route path="/create" component={CreateRoomPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const appDiv = document.getElementById('app');
render(<App />, appDiv);
