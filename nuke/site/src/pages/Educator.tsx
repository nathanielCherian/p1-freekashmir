import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Class } from '../model';
import { makeRequest } from '../utils/API';

export const CreateClass = () => {

    const [stage, setStage] = useState<number>(1);
    const [classData, setClassData] = useState<Class>({
        teacherName:"",
        classSlug:"",

        auth:"",
    });


    const handleSubmit = (event:any) => {
        event.preventDefault();
    }


    const createClass = () => {
        makeRequest(classData, 'classes/', 'POST')
        .then((response:any) => {
            console.log(response);
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
        //setStage(1);
    }

    
    var inputs;
    if(stage === 1){
        inputs = (
            <>
                <Input params={{type:"text", placeholder:"password", name:"password", value:classData.auth}}
                onchange={(event)=>setClassData((classData)=>({...classData, auth:event.target.value}))}/>
                <Button text="next" onclick={passwordSubmit}/>
            </>
        )
    }else if(stage === 2){
        inputs = (
            <>
                <Input params={{type:"text", placeholder:"name", name:"teacherName", value:classData.teacherName}}
                onchange={(event)=>setClassData((classData)=>({...classData, teacherName:event.target.value}))}/>
                
                <Input params={{type:"text", placeholder:"class name", name:"classSlug", value:classData.classSlug}}
                onchange={(event)=>setClassData((classData)=>({...classData, classSlug:event.target.value}))}/>
                

                <Button text="submit" onclick={createClass}/>
            </>
        )
    }



    return (
        <div className="class-form">
            <div className="form-container">
                <h1>Create A Class</h1>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="project-form__inputs">
                        {inputs}
                    </div>
                </form>
            </div>
        </div>
    )
}