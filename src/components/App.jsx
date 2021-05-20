import React from 'react';
import history from "./../history";
import { Switch, Route, Router } from 'react-router-dom';
import Main from './Main.jsx';
import Data from './Data.jsx';
import { DATA_TYPES } from './../const.js';

const App =() => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/"><Main /></Route>
        <Route exact path="/small"><Data dataType={DATA_TYPES[0]}/></Route>
        <Route exact path="/big"><Data dataType={DATA_TYPES[1]}/></Route>
      </Switch>
    </Router>
  );
};

export default App;
