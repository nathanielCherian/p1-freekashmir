import React from 'react';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Jumbotron from './components/Jumbotron';
import './App.css';
import './css/main.css'
import Navbar from './components/Navbar';
import './fonts/exil.ttf'
import { Homepage } from './pages/Homepage';
import { CreateProject, TestClassCode } from './pages/Project';
import { CreateClass } from './pages/Educator';
import { ClassPage, ProjectOnClassPage } from './pages/ClassPage';


const pages = [
  {path:"/", name:"homepage", Component:Homepage},
  {path:"/create-project/", Component:TestClassCode},
  {path:"/create-project/:classCode", Component:CreateProject},
  {path:"/create-class", Component:CreateClass},

  {path:"/class/:classSlug", Component:ClassPage},
  {path:"/class/:classSlug/:projectId", Component:ProjectOnClassPage}

]


function App() {

  const routes = pages.map(({path, Component}) => (
    <Route key={path} exact path={path}>
      <Component />
    </Route>
  ));

  return (
    <>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Night at the Museum</title>
          <meta name="description" content="Night at the Museum @ DNHS 2022" />
          <meta itemProp="description" content="Night at the Museum @ DNHS 2022" />
      </Helmet>

      <Router>
        <div className="App standard-background full-screen main-container">
          {routes}
        </div>
      </Router>

    </>
  );
}

export default App;
