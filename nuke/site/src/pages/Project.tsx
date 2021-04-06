import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom'
import { Class, Project } from '../model';
import { makeRequest } from '../utils/API';
import '../css/project.css';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const CreateProject = () => {

    const {classCode} = useParams<any>();
    const [classData, setClassData] = useState<Class|boolean>()
    const [projectData, setProjectData] = useState<Project>({
        studentName:"",
        grade:-1,
        classCode:classCode,

        completed:false
    });

    const validateClassCode = () => {
        makeRequest({}, `classes?classCode=${classCode}`, "GET")
            .then((response:Class[]) => {
                if(response.length > 0){
                    console.log("class exists");
                    setClassData(response[0]);
                }else{
                    setClassData(false);
                }
            });
    }

    useEffect(()=>{
        validateClassCode();
    }, [])


    /*
    * Handle false cases
    */
    if(typeof classData === 'undefined') {
        return (
            <div></div>
        )
    }
    if(!classData){
        return (
            <div>
                <h1>This class does not exist</h1>
            </div>
        )
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        makeRequest(projectData, 'students', 'POST')
            .then((response:any) => {
                setProjectData((projectData) => ({...projectData, completed:response.completed}))
                console.log(response);
            });
    }


    /*
    * True case
    */ 

    var data;
    if(!projectData.completed){
        const cd = classData as Class;
        data = (
            <div className="form-container">
                <h1>Class Code: {classCode}</h1>
                <h1>With {cd.teacherName}</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="project-form__inputs">
                        <Input params={{type:"text", placeholder:"name"}} 
                        onchange={(event)=>setProjectData((projectData) => ({...projectData, studentName:event.target.value}))}/>
                        <Input params={{type:"number", placeholder:"grade", min:9, max:12}}
                        onchange={(event)=>setProjectData((projectData) => ({...projectData, grade:parseInt(event.target.value)}))}/>
                        <Button text="submit" params={{type:"submit"}}/>
                    </div>

                </form>
            </div>
        )
    }else{
        data = (
            <div className="form-container">
                <h1>Project Created!</h1>
            </div>
        )
    }



    return (
        <div className="project-form">
            {data}
        </div>
    )
}




export const TestClassCode = () => {

    const [classCode, setClassCode] = useState<String>("");
    const [redirect, setRedirect] = useState<JSX.Element>();

    const handleSubmit = (event:any) => {
        event.preventDefault();
        makeRequest({}, `classes?classCode=${classCode}`, "GET")
        .then((response:Class[]) => {
            if(response.length > 0){
                console.log("class exists");
                setRedirect(<Redirect to="/"/>)
            }else{
                //false
            }
        });
    }

    if(redirect){
        return redirect;
    }

    return (
        <div className="form-container">
            <div className="project-form">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="project-form__inputs">
                        <Input params={{type:"text", placeholder:"class code"}} 
                        onchange={(event)=>setClassCode(event.target.value)}/>
                        <Button text="submit" params={{type:"submit"}} />
                    </div>
                </form>
            </div>
        </div>
    )

}