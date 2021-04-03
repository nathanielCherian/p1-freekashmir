import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Class } from '../model';
import { makeRequest } from '../utils/API';
import '../css/project.css';
import { Input } from '../components/Input';

export const CreateProject = () => {

    const {classCode} = useParams<any>();
    const [classData, setClassData] = useState<Class|boolean>()


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

    const handleSubit = (event:any) => {
        event.preventDefault();
    }

    /*
    * True case
    */ 

    return (
        <div className="project-form">
            <div className="form-container">
                <form className="form" onSubmit={handleSubit}>
                    <div className="project-form__inputs">
                        <Input params={{type:"text", placeholder:"name"}}/>
                        <Input params={{type:"text", placeholder:"name"}}/>
                    </div>

                </form>
            </div>
        </div>
    )
}