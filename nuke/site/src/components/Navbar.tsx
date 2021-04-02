import React from 'react';
import {Link} from "react-router-dom";

const Navbar = (props:{link:string, text:string}) => {

    const {link, text} = props;

    return (
        <nav className="navbar">
            <div className="navbar__bar">
                <div className="nav-item left">
                    <span className="nav-text">{text}</span>
                </div>
            </div>
        </nav>
    )
}



export default Navbar;