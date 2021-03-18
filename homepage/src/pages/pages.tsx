import React from "react";
import GSPage from "../components/gspage";
import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";


const Homepage = () => {
    return (
        <div className="homepage">
            <Navbar/>
            <Jumbotron/>
        </div>
    )
}

const GetStarted = () => {
    return(
        <div className="gs">
            <GSPage/>
        </div>
    )
}

export {Homepage, GetStarted};