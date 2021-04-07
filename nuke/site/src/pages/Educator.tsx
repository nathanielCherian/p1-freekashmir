import React, { useState } from 'react';
import slugify from 'react-slugify';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Class } from '../model';
import { makeRequest } from '../utils/API';

export const CreateClass = () => {

    const [finished, setFinished] = useState<boolean>(false);
    const [stage, setStage] = useState<number>(1);
    const [classData, setClassData] = useState<Class>({
        teacherName:"",
        className:"",
        classSlug:"",

        classCode:"",

        completed:false,
        auth:"",
    });


    const handleSubmit = (event:any) => {
        event.preventDefault();
    }


    const createClass = () => {
        classData.classSlug = slugify(classData.className);
        makeRequest(classData, 'classes/', 'POST')
        .then((response:Class) => {
            console.log(response);
            setClassData((classData)=>({...classData, completed:true, classCode:response.classCode}))
            setFinished(true);
        });
    }

    const passwordSubmit = () => {
        console.log("password submitted");
        makeRequest({auth:classData.auth}, 'classes/checkPassword/', 'POST')
            .then((response:{valid:boolean}) => {
                if(response.valid){
                    setStage(2)
                }else{
                    console.log("password incorrect");
                }
            });
    }

    



    var inputs;
    if(stage === 1){
        inputs = (
            <>
                <Input grow params={{type:"text", placeholder:"password", name:"password", value:classData.auth}}
                onchange={(event)=>setClassData((classData)=>({...classData, auth:event.target.value}))}/>
                <Button text="next" onclick={passwordSubmit}/>
            </>
        )
    }else if(stage === 2){
        inputs = (
            <>
                <Input grow params={{type:"text", placeholder:"name", name:"teacherName", value:classData.teacherName}}
                onchange={(event)=>setClassData((classData)=>({...classData, teacherName:event.target.value}))}/>
                
                <Input grow params={{type:"text", placeholder:"class name", name:"className", value:classData.className}}
                onchange={(event)=>setClassData((classData)=>({...classData, className:event.target.value}))}/>
                

                <Button text="submit" onclick={createClass}/>
            </>
        )
    }


    var mainStage;
    if(classData.completed == true){
        mainStage = (
            <div>
                <h1>Class Created!</h1>
                <h1>Class Code: {classData.classCode}</h1>
            </div>
        )
    }else {
        mainStage = (
            <div className="form-container">
                <h1>Create A Class</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="project-form__inputs">
                        {inputs}
                    </div>
                </form>
            </div>
        )
    }


    return (
        <div className="class-form">
            {mainStage}
        </div>
    )
}