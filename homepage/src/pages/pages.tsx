import React from "react";
import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";
import SelectionBox from "../components/selection";


const Homepage = () => {
    return (
        <div className="panel-bg">
            <Navbar link="/get-started" text="Get Started"/>
            <Jumbotron/>
        </div>
    )
}

const GetStarted = () => {
    return(
        <div className="panel-bg">
            <Navbar link="/" text="Home"/>
            <div className="jumbotron-center">
                <div className="selection-container">
                    <SelectionBox text="I am a Student"/>
                    <SelectionBox text="I am an Educator"/>
                </div>
            </div>
        </div>
    )
}

export {Homepage, GetStarted};