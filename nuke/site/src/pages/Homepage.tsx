import React from 'react';
import Jumbotron from '../components/Jumbotron';
import Navbar from '../components/Navbar';

export const Homepage = () => {
    return (
        <>
        
        <Navbar link="/" text="get started"/>
    
            <Jumbotron/>
            
        <div className="navbar"></div>
      </>
    )
}

