import React, {useState} from "react";
import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";
import SelectionBox from "../components/selection";
import StudentForm from "../components/studentform";


const Homepage = () => {
    return (
        <div className="panel-bg">
            <Navbar link="/get-started" text="Get Started"/>
            <Jumbotron/>
        </div>
    )
}

const GetStarted = () => {

    const [display, setDisplay] = useState(1); //0, 1, 2

    var toRender;
    if(display === 0){
        toRender = (
            <div className="selection-container">
                <SelectionBox text="I am a Student"/>
                <SelectionBox text="I am an Educator"/>
            </div>
        )
    }else if(display === 1){
        toRender = <StudentForm/>
    }else if (display === 2){

    }


    return(
        <div className="panel-bg">
            <Navbar link="/" text="Home"/>
            <div className="jumbotron-center">
                {toRender}
            </div>
        </div>
    )
}

export {Homepage, GetStarted};