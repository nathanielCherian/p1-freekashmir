import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
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
                <h1><Link to={`/class/${classSlug}/${project.id}`}>{`${project.studentName} is in ${project.grade}`}</Link></h1>
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



export const ProjectOnClassPage = () => {

    const {classCode, projectId} = useParams<any>();

    const [projectData, setProjectData] = useState<Project|boolean>();

    const getProject = () => {
        makeRequest({}, `students?classCode=${classCode}&id=${projectId}`)
            .then((response:Project[]) => {
                if(response.length > 0){
                    setProjectData(response[0]);
                }else{
                    setProjectData(false);
                }
            });
    }

    useEffect(() => {
        getProject();
    }, []);

    if(typeof projectData === "undefined"){
        return <div></div>
    }

    if(!projectData){
        return (
            <div>
                <h1>This project does not exist.</h1>
            </div>
        )
    }


    var pd = projectData as Project;

    return (
        <div>
            <h1>This project exists.</h1>
            <h1>name: {pd.studentName}</h1>
            <h1>grade: {pd.grade}</h1>
        </div>
    )

}