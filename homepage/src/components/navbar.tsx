import React from 'react';
import '../scss/components/navbar.scss'

const Navbar = (props:{setPage:Function}) => {

    const {setPage} = props;

    return (
        <nav className="navbar">
            <div className="nav-item logo-text">
                <span className="get-started" onClick={() => setPage("get-started")}>Get Started</span>
            </div>
        </nav>
    )
}



export default Navbar;