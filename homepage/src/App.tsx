import React, {useState}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {Homepage} from './pages/pages';
import GSPage from './components/gspage';
import './scss/main.scss'

function App() {

  return (

      <Router>

        <div className="App">


        <Switch>

          <Route path="/get-started">
            <GSPage/>
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
