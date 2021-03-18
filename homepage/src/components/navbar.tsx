import React from 'react';
import {Link} from "react-router-dom";
import '../scss/components/navbar.scss'

const Navbar = (props:{link:string, text:string}) => {

    const {link, text} = props;

    return (
        <nav className="navbar">
            <div className="nav-item logo-text">
                <span className="get-started left-side"><Link to={link}>{text}</Link></span>
            </div>
        </nav>
    )
}



export default Navbar;