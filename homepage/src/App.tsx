import React, {useState}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {GetStarted, Homepage} from './pages/pages';
import './scss/main.scss'

function App() {

  return (

      <Router>

        <div className="App">


        <Switch>

          <Route path="/get-started">
            <GetStarted/>
          </Route>

          <Route path="/">
            <Homepage/>
          </Route>

        </Switch>

        </div>

      </Router>

  );
}

export default App;
