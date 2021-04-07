import React, { useEffect, useState } from 'react';
import { Input } from '../components/Input';
import { Class, Project } from '../model';
import { makeRequest } from '../utils/API';

export const SearchExplore = () => {

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [classes, setClasses] = useState<Class[]>();
    const [projects, setProjects] = useState<Project[]>();

    const loadData = () => {
        makeRequest({}, "classes", "GET")
            .then((response:Class[]) => {
                setClasses(response);
            });

        makeRequest({}, "students", "GET")
            .then((response:Project[]) => {
                setProjects(response); 
            });
    }

    useEffect(()=> {
        loadData();
    }, [])


    const classMatch = classes?.map((classD) => {
        if(classD.className?.includes(searchQuery)){
            return (
                <div>
                    <h1>Class: {classD.className}</h1>
                </div>
            )
        }
    });

    const projectMatch = projects?.map((project) => {
        if(project.studentName?.includes(searchQuery)){
            return (
                <div>
                    <h1>Student: {project.studentName}</h1>
                </div>
            )
        }
    })


    return (
        <div>
            <h1>Explore</h1>
            <div className="form-container">
                <h1>Search for a name or class.</h1>
                <form className="form">
                    <Input params={{placeholder:"search"}} onchange={(event)=>setSearchQuery(event.target.value)}/>
                </form>
            </div>

            {classMatch}
            {projectMatch}

        </div>
    )
}