import React, {useState}from 'react';
import Jumbotron from './components/jumbotron';
import Navbar from './components/navbar';
import GetStarted from './components/getstarted';
import logo from './logo.svg';
import './scss/main.scss'

function App() {

  const [page, setPage] = useState("home");

  console.log("page ", page);

  var toRender = <div></div>;
  if(page === 'get-started'){
    toRender = <GetStarted/>
  }

  return (
    <div className="App">
        <div className="homepage">
          <Navbar setPage={setPage}/>
          <Jumbotron/>
          {toRender}
        </div>
    </div>
  );
}

export default App;
