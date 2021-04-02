import React from 'react';
import logo from './logo.svg';
import Jumbotron from './components/Jumbotron';
import './App.css';
import './css/main.css'
import Navbar from './components/Navbar';
import './fonts/exil.ttf'

function App() {
  return (
    <div className="App standard-background full-screen main-container">
      <Navbar link="/" text="get started"/>

      <Jumbotron/>
      
      <div className="navbar"></div>
    </div>
  );
}

export default App;
