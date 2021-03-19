import React, {useState, useEffect} from "react";
import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";
import SelectionBox from "../components/selection";
import StudentForm from "../components/studentform";

import {CSSTransition, TransitionGroup} from 'react-transition-group';
import '../scss/components/transition.scss'
import EducatorForm from "../components/educatorform";

const Homepage = () => {
    return (
        <div className="panel-bg">
            <Navbar link="/get-started" text="Get Started"/>
            <Jumbotron/>
        </div>
    )
}

const GetStarted = (props:any) => {

    const [display, setDisplay] = useState(0); //0, 1, 2
    const [unlinkedDisplay, setUnlinkedDisplay] = useState(0);

    const [selectionVisible, setSelectionVisible] = useState(false);
    const nodeRef = React.useRef(null);
    const animateForm = (d:number) => {
        setSelectionVisible(false)
        setUnlinkedDisplay(d);
    } 


    useEffect(()=>{
        setSelectionVisible(true); //Load in forms
    }, [])


    var toRender;
    if(display === 0){
  
        toRender = (
            <CSSTransition nodeRef={nodeRef} unmountOnExit in={selectionVisible} timeout={1000} classNames="test-node" onExited={()=>setDisplay(unlinkedDisplay)}>
                <div className="selection-container" ref={nodeRef}>
                    <SelectionBox text="I am a Student" onClicked={()=>animateForm(1)}/>
                    <SelectionBox text="I am an Educator"  onClicked={()=>animateForm(2)}/>
                </div>
            </CSSTransition>
        )
    }else if(display === 1){
        toRender = (
            <StudentForm/>
        );
    }else if(display === 2){
        toRender = (
            <EducatorForm/>
        );
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

/*
            {/*<CSSTransition nodeRef={nodeRef} unmountOnExit in={test} timeout={1000} classNames="test-node">
                    <div ref={nodeRef}>
                        <h1>Hope</h1>
                    </div>
                </CSSTransition>
    <button onClick={()=>setTest(!test)}>Hide</button>*/
