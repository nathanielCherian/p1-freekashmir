import { truncateSync } from 'fs';
import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { ClassForm } from '../interfaces';
import '../scss/components/createform.scss'
import '../scss/components/transition.scss'
import makeRequest from '../Util';

const StudentForm = () => {


    const [data, setData] = useState({
        classCode:"",
        name:"",
        grade:-1
    })

    const [classCode, setClassCode] = useState("");
    const [modifier, setModifier] = useState("");
    const [redirect, setRedirect] = useState(false);



    const verifyClassCode = (event:any) => {
        event.preventDefault();

        makeRequest(data, 'students/checkClassCode', 'POST')
            .then((response:any) => {
                if(response.valid === true){
                    setModifier("correct")
                    setRedirect(true);
                }else{
                    setModifier("incorrect")
                }
            })

    }


    const nodeRef = React.useRef(null);


    if(redirect){
        return <Redirect to={`/get-started/classes/${data.classCode}`}/>;
    }

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


const CompleteStudentForm = (props:{classCode:string}) => {

    const {classCode} = props;

    const [isValid, setIsValid] = useState(null)
    const [classData, setClassData] = useState<ClassForm>({});

    const validateClassCode = () => {
        makeRequest({classCode}, 'students/checkClassCode', 'POST')
            .then((response:any) => {
                console.log(response)
                setIsValid(response.valid);
                if(response.valid){
                    setClassData({...response.class, valid:true});
                }else{
                    setClassData({valid:false})
                }
            });
    }
    useEffect(() => {
        validateClassCode();
    }, [])


    if(Object.keys(classData).length === 0){ // Render errors
        return <></>
    }else if(!classData.valid){
        return <h1>Whoops, you're not supposed to see this </h1>
    }

    return (    
        <div>
            <h1>Class Code: {classData.classCode}</h1>
            <h1>Teacher name: {classData.teacherName}</h1>
        </div>
    )

}


export {StudentForm, CompleteStudentForm};