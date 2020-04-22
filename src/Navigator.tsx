import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import MenuScreen from './Screens/Menu'
import BoardScreen from './Screens/Board'
import CreditsScreen from './Screens/Credits'

export default function Navigator() {
  return (
    <Router>
        <Switch>
          <Route path="/credits">
            <CreditsScreen />
          </Route>
          <Route path="/:room">
            <BoardScreen />
          </Route>
          <Route path="/">
            <MenuScreen />
          </Route>
        </Switch>
    </Router>
  );
}