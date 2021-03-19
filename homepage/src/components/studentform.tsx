import React, {useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import '../scss/components/createform.scss'
import '../scss/components/transition.scss'

const StudentForm = () => {


    const [classCode, setClassCode] = useState("");
    const [displayed, setDisplayed] = useState(false);
    useEffect(()=>{
        setDisplayed(true)
    }, []);

    const handleSubmit = (event:any) => {
        //post to spring
        event.preventDefault();
        setDisplayed(false)
    }


    const nodeRef = React.useRef(null);

    return (
        <div className="form-container">
            <CSSTransition nodeRef={nodeRef} unmountOnExit in={displayed} timeout={1000} classNames="test-node">
                <form className="center-form" autoComplete="off" onSubmit={handleSubmit} ref={nodeRef}>
                    <label className="form-label">Class Code</label>
                    <input type="text" name="classCode" maxLength={5} className="form-input__text" onChange={(event)=>setClassCode(event.target.value)}/>
                    <input type="submit" className="form-submit"/>
                </form>
            </CSSTransition>
        </div>
    )
}

export default StudentForm;