import React, {useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import '../scss/components/createform.scss'
import '../scss/components/transition.scss'

import {ClassForm} from '../interfaces';
import makeRequest from '../Util';

const EducatorForm = () => {

    const [displayed, setDisplayed] = useState(false);

    const [data, setData] = useState({
        code:"",
        name:"",
    });

    const [code, setCode] = useState("");
    const [modifier, setModifier] = useState("");


    useEffect(()=>{
        setDisplayed(true) //dont fade out
    }, []);


    const handleSubmit = (event:any) => {
        event.preventDefault()
        makeRequest({auth:code}, 'classes/checkPassword/', 'POST')
        .then((data:any) => {
            if(data.valid){
                setModifier("correct")
            }else{
                setModifier("incorrect")
            }
        });
        return false;
    }

    const nodeRef = React.useRef(null);

    const [slide, setSlide] = useState(0);
    const getSlide = () => {
        switch(slide){
            case 0:
                return (
                    <Question0 data={data} setData={setData} setSlide={setSlide}/>
                )
            case 1:
                return (
                    <Question1 data={data} setData={setData} setSlide={setSlide}/>
                )
            default:
                return <></>
        }
    }


    return (
        <CSSTransition nodeRef={nodeRef} unmountOnExit in={displayed} timeout={1000} classNames="test-node">
            <div className="form-container" ref={nodeRef}>
                {getSlide()}
            </div>
        </CSSTransition>
    )
}


const Question0 = (props:{data:ClassForm, setData:Function, setSlide:Function}) => {

    const {data, setData, setSlide} = props;

    const [modifier, setModifier] = useState("");
    const [displayed, setDisplayed] = useState(true);

    const hs = (event:any) => {
        event.preventDefault()
        makeRequest({auth:data.code}, 'classes/checkPassword/', 'POST')
        .then((data:any) => {
            if(data.valid){
                setModifier("correct")
                setSlide(1)
            }else{
                setModifier("incorrect")
            }
        });
        return false;
    }

    const smallNodeRef = React.useRef(null);
    return (
        <CSSTransition nodeRef={smallNodeRef} unmountOnExit in={displayed} timeout={1000} classNames="side-node">
            <form className="center-form" autoComplete="off" onSubmit={hs} ref={smallNodeRef} >
                <label className="form-label">Password</label>
                <input type="text" name="code" maxLength={10} className={"form-input__text " + modifier} onAnimationEnd={()=>setModifier("")} onChange={(event)=>setData({code:event.target.value})}/>
                <input type="submit" className="form-submit"/>
            </form>
        </CSSTransition>
    )
}


const Question1 = (props:{data:ClassForm, setData:Function, setSlide:Function}) => {
    const [displayed, setDisplayed] = useState(false);
    const {data, setData, setSlide} = props;

    useEffect(()=>{
        setDisplayed(true) //Animate on mount
    }, []);
    const nodeRef = React.useRef(null);
    const smallNodeRef = React.useRef(null);
    return (
        <CSSTransition nodeRef={smallNodeRef} unmountOnExit in={displayed} timeout={1000} classNames="side-node">
            <form className="center-form" autoComplete="off" ref={smallNodeRef}>
                <label className="form-label">Name</label>
                <input type="text" name="code" maxLength={10} className="form-input__text " onChange={(event)=>setData({name:event.target.value})}/>
                <input type="submit" className="form-submit"/>
            </form>
        </CSSTransition>
    )
}




export default EducatorForm;