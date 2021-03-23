import React, {useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import '../scss/components/createform.scss'
import '../scss/components/transition.scss'

import {checkPassword} from '../interfaces';
import makeRequest from '../Util';

const EducatorForm = () => {

    const [code, setCode] = useState("");
    const [displayed, setDisplayed] = useState(false);
    const [modifier, setModifier] = useState("");


    useEffect(()=>{
        setDisplayed(true)
    }, []);


    const handleSubmit = (event:any) => {
        event.preventDefault()
        makeRequest({auth:code}, 'classes/checkPassword/', 'POST')
        .then((data:any) => {
            if(data.valid){
                setModifier("correct")
                setDisplayed(false)
            }else{
                setModifier("incorrect")
            }
        });
        return false;
    }



    const nodeRef = React.useRef(null);

    return (
        <div className="form-container">
            <CSSTransition nodeRef={nodeRef} unmountOnExit in={displayed} timeout={1000} classNames="test-node">
                <form className="center-form" autoComplete="off" onSubmit={handleSubmit} ref={nodeRef}>
                    <label className="form-label">Password</label>
                    <input type="text" name="code" maxLength={10} className={"form-input__text " + modifier} onAnimationEnd={()=>setModifier("")} onChange={(event)=>setCode(event.target.value)}/>
                    <input type="submit" className="form-submit"/>
                </form>
            </CSSTransition>
        </div>
    )
}

export default EducatorForm;