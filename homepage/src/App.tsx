import React from 'react';
import Jumbotron from './components/jumbotron';
import Navbar from './components/navbar';
import logo from './logo.svg';
import './scss/main.scss'

function App() {
  return (
    <div className="App">
        <div className="homepage">
          <Navbar/>
          <Jumbotron/>
        </div>
    </div>
  );
}

export default App;
