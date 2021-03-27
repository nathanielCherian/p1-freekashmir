import React, {useEffect, useState} from 'react';
import { CSSTransition } from 'react-transition-group';
import { ProjectForm } from '../interfaces';
import '../scss/components/createform.scss'
import '../scss/components/transition.scss'
import makeRequest from '../Util';

const StudentForm = () => {


    const [data, setData] = useState<ProjectForm>({
        classCode:"",
        name:"",
        grade:-1
    })

    const [classCode, setClassCode] = useState("");
    const [modifier, setModifier] = useState("");




    const verifyClassCode = (event:any) => {
        event.preventDefault();

        makeRequest(data, 'students/checkClassCode', 'POST')
            .then((response:any) => {
                if(response.valid === true){
                    setModifier("correct")
                }else{
                    setModifier("incorrect")
                }
            })

    }


    const nodeRef = React.useRef(null);

    return (
        <div className="form-container">
            <form className="center-form" autoComplete="off" onSubmit={verifyClassCode}>
                <label className="form-label">Class Code</label>
                <input type="text" name="classCode" maxLength={5} className={"form-input__text " + modifier} 
                onAnimationEnd={()=>setModifier("")} 
                onChange={(event)=>setData((data)=>({...data, classCode:event.target.value}))}/>
                <input type="submit" className="form-submit"/>
            </form>
        </div>
    )



    /*
    return (
        <div className="form-container">
            <CSSTransition nodeRef={nodeRef} unmountOnExit in={displayed} timeout={1000} classNames="test-node">
                <form className="center-form" autoComplete="off" onSubmit={handleSubmit} ref={nodeRef}>
                    <label className="form-label">Class Code</label>
                    <input type="text" name="classCode" maxLength={5} className={"form-input__text " + modifier} onAnimationEnd={()=>setModifier("")} onChange={(event)=>setClassCode(event.target.value)}/>
                    <input type="submit" className="form-submit"/>
                </form>
            </CSSTransition>
        </div>
    )*/
}

export default StudentForm;