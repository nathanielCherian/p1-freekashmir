import React, {useState}from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {GetStarted, Homepage} from './pages/pages';
import './scss/main.scss'

function App() {


  const pages = [
    {path:"/", name:"homepage", Component:Homepage},
    {path:"/get-started", name:"get-started", Component:GetStarted},
  ]


  const routes = pages.map(({path, Component}) => (
    <Route key={path} exact path={path}>
      <Component/>
    </Route>
  ))

  return (

      <Router>
        <div className="App">
          {routes}
        </div>
      </Router>

  );
}

export default App;

/*


        <Switch>

          <Route path="/get-started">
            <GetStarted/>
          </Route>

          <Route path="/">
            <Homepage/>
          </Route>

        </Switch>

        */