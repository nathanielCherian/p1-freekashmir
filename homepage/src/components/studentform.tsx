import { truncateSync } from 'fs';
import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router';
import { CSSTransition } from 'react-transition-group';
import { Class, ClassForm, Project } from '../interfaces';
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

    const [projectData, setProjectData] = useState<Project>({
        studentName:"",
        grade:-1
    })
    const [classData, setClassData] = useState<Class>();

    const [response, setResponse] = useState({
        completed:false,
    });
 
    const [modifier, setModifier] = useState({
        studentName:"",
        grade:""
    });

    const validateClassCode = () => {
        makeRequest({classCode}, 'students/checkClassCode', 'POST')
            .then((response:any) => {
                console.log(response)
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


    const handleSubmit = (event:any) => {
        event.preventDefault();

        if(projectData.studentName === ""){
            setModifier((modifier) => ({...modifier, studentName:"incorrect"}));
            return;
        }

        if((projectData.grade || -1) < 0){
            setModifier((modifier) => ({...modifier, grade:"incorrect"}));
            return;
        }        

        makeRequest({...projectData, classCode}, 'students', 'POST')
            .then((response:any) => {
                setResponse(response);
            })

    }


    if(classData == null){ // Render errors
        return <></>
    }else if(!classData.valid){
        return <h1>Whoops, you're not supposed to see this </h1>
    }

    if(response.completed){
        return (
            <div className="form-container">
                <h1>Thanks {projectData.studentName}, Your good to go!</h1>
            </div>
        )
    }

    return (    
        <div className="form-container">
            <h1>Class Code: {classData.classCode}</h1>
            <h1>Teacher: {classData.teacherName}</h1>

            <form className="center-form" autoComplete="off" onSubmit={handleSubmit}>

                <input type="text" name="studentName" maxLength={30} className={"form-input__text " + modifier.studentName}
                placeholder="name"
                onChange={(event)=>setProjectData((projectData)=>({...projectData, studentName:event.target.value}))}
                onAnimationEnd={()=>setModifier((modifier)=>({...modifier, studentName:""}))}
                />

                <input type="number" min={9} max={12} name="grade" maxLength={1} className={"form-input__text " + modifier.grade}
                placeholder="grade"
                onChange={(event)=>setProjectData((projectData)=>({...projectData, grade:+event.target.value}))}
                onAnimationEnd={()=>setModifier((modifier)=>({...modifier, grade:""}))}
                />

                <input type="submit" className="form-submit"/>
            </form>
        </div>
    )

}


export {StudentForm, CompleteStudentForm};