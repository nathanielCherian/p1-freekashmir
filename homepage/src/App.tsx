import React, {useState}from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {ExplorePage, GetStarted, Homepage, StudentFormComplete} from './pages/pages';
import './scss/main.scss'

function App() {


  const pages = [
    {path:"/", name:"homepage", Component:Homepage},
    {path:"/get-started", name:"get-started", Component:GetStarted},
    {path:"/get-started/classes/:classCode", Component:StudentFormComplete},
    {path:"/explore", Component:ExplorePage},

  ]


  const routes = pages.map(({path, Component}) => (
    <Route key={path} exact path={path}>
      <Component/>
    </Route>
  ))

  return (

      <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Night at the Museum</title>
        <meta itemProp="description" content="Night at the Museum @ DNHS 2022" />
      </Helmet>

      <Router>
        <div className="App">
          {routes}
        </div>
      </Router>

      </>

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