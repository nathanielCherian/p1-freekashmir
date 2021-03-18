import React, {useState, useEffect } from 'react';
import '../scss/components/transition.scss'
import { CSSTransition } from 'react-transition-group';

const GetStarted = () => {

    const [grow, setGrow] =  useState(0);
    const [bg, setBg] =  useState(0);

    useEffect(() => {
        setGrow(1)
    }, []);


    const animEnded = () => {
        setGrow(0);
        setBg(1)
    }

    console.log({bg})
    return (
        <div className="getstarted-background" data-bg={bg}>
            <svg xmlns="http://www.w3.org/2000/svg">
                <path fill="#FF0066" d="M59.4,-0.8C59.4,30.2,29.7,60.5,-1.1,60.5C-32,60.5,-64,30.2,-64,-0.8C-64,-31.8,-32,-63.6,-1.1,-63.6C29.7,-63.6,59.4,-31.8,59.4,-0.8Z" 
                onClick={()=>setGrow(1)} 
                onAnimationEnd={animEnded}
                data-grow={grow}
                 />
            </svg>
        </div>
    )
};

export default GetStarted;

