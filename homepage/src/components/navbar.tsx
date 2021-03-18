import React from 'react';
import {Link} from "react-router-dom";
import '../scss/components/navbar.scss'

const Navbar = () => {


    return (
        <nav className="navbar">
            <div className="nav-item logo-text">
                <span className="get-started" onClick={() => {}}><Link to="/get-started">Get Started</Link></span>
            </div>
        </nav>
    )
}



export default Navbar;