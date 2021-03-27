import React, {useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import '../scss/components/createform.scss'
import '../scss/components/transition.scss'

import {ClassForm, ClassFormResponse} from '../interfaces';
import makeRequest from '../Util';

const EducatorForm = () => {

    const [displayed, setDisplayed] = useState(false);

    const [response, setResponse] = useState<ClassFormResponse>({
        completed:false
    });

    const [data, setData] = useState<ClassForm>({
        auth:"",
        name:""
    });

    const [modifier, setModifier] = useState({
        password:"",
        name:""
    });


    useEffect(()=>{
        setDisplayed(true) //dont fade out
    }, []);


    const validateSubmit = (data:ClassForm) => {
        console.log(data);
        makeRequest({auth:data.auth}, 'classes/checkPassword/', 'POST')
        .then((responseData:any) => {
            if(responseData.valid){
                setModifier(modifier=>({...modifier, password:"correct"}))
                if(data.name !== ""){
                    setModifier(modifier=>({...modifier, name:"correct"}))
                    submitForm(data)
                }else{
                    setModifier(modifier=>({...modifier, name:"incorrect"}))
                }
            }else{
                setModifier(modifier=>({...modifier, password:"incorrect"}))
            }
        });
    }

    const submitForm = (data:ClassForm) => {
        makeRequest(data, 'classes/', 'POST')
        .then((responseData:ClassFormResponse) => {
            if(responseData.completed){
                setResponse(responseData);
            }
        }).catch((reason:any) => {
            console.log(reason);
        });
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        console.log(data);
        validateSubmit(data);

        return;
        /*

        return false;*/
    }

    const nodeRef = React.useRef(null);
    
    if(!response.completed){ //get form info
        return (
            <div className="form-container">
                <form className="center-form" autoComplete="off" onSubmit={handleSubmit}>
    
                    <input type="text" name="code" maxLength={10}
                    placeholder="password"
                    className={"form-input__text " + modifier.password} 
                    onAnimationEnd={()=>setModifier(modifier=>({...modifier, password:""}))} 
                    onChange={(event)=>setData(data=>({...data, auth:event.target.value}))}/>
    
    
                    <input type="text" name="name" maxLength={10}
                    placeholder="name"
                    className={"form-input__text "+ modifier.name}
                    onAnimationEnd={()=>setModifier(modifier=>({...modifier, name:""}))}
                    onChange={(event)=>setData(data=>({...data, name:event.target.value}))}/>
    
    
                    <input type="submit" className="form-submit"/>
    
                </form>
            </div>
        )
    }else if(response.completed){ //Display code
        return (
            <div className="info-screen">
                <h1>You're all set!</h1>
                <h1 className="class-code">{response.classCode}</h1>
                <h1>Share this code with your class</h1>
            </div>
        )
    }


    /*

                    <div>
                    <span className="form-label">Name</span>
                    <input type="text" name="name" maxLength={30} placeholder="Name"
                    className={"form-input__text " + modifier} 
                    onAnimationEnd={()=>setModifier("")} 
                    onChange={(event)=>setData(data=>({...data, name:event.target.value}))}/>
                </div
                */


    /*

    <label className="form-label">Password</label>

    return (
        <CSSTransition nodeRef={nodeRef} unmountOnExit in={displayed} timeout={1000} classNames="test-node">
            <div className="form-container" ref={nodeRef}>
                {getSlide()}
            </div>
        </CSSTransition>
    )*/
    return <></>
}


/*
const Question0 = (props:{data:ClassForm, setData:Function, setSlide:Function}) => {

    const {data, setData, setSlide} = props;

    const [modifier, setModifier] = useState("");
    const [displayed, setDisplayed] = useState(true);

    const hs = (event:any) => {
        event.preventDefault()
        makeRequest({auth:data.auth}, 'classes/checkPassword/', 'POST')
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
                <input type="text" name="code" maxLength={10} className={"form-input__text " + modifier} onAnimationEnd={()=>setModifier("")} onChange={(event)=>setData({auth:event.target.value})}/>
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

*/


export default EducatorForm;