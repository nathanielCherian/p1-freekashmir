import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Class, Project } from '../model';
import { makeRequest } from '../utils/API';

export const ClassPage = () => {

    const {classSlug} = useParams<any>();

    const [classData, setClassData] = useState<Class|boolean>();
    const [projects, setProjects] = useState<Project[]>();


    const checkSlug = () => {
        makeRequest({}, `/classes?classSlug=${classSlug}`, "GET")
            .then((response:Class[]) => {
                if(response.length > 0){
                    getStudents(response[0]);
                }else{
                    setClassData(false);
                }
            });
    }

    const getStudents = (classD:Class) => {
        const {classCode} = classD as Class
        makeRequest({}, `students?classCode=${classCode}`, "GET")
            .then((response:Project[]) => {
                console.log(response);
                setProjects(response);
            });
        setClassData(classD);
    }

    useEffect(()=> {
        checkSlug();
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


    var studentProjects;
    if(projects){
        studentProjects = projects.map((project) => {
            return (
                <h1>{project.studentName} is in {project.grade}</h1>
            )
        });
    }


    return (
        <div>
            <h1>This class exists</h1>
            {studentProjects}
        </div>
    )
}