import React from 'react';
import history from "./../history";
import { Switch, Route, Router } from "react-router-dom";
import Main from './Main.jsx';

const App =() => {

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
