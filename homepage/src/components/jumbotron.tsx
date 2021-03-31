// @ts-nocheck

import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Button from './button';
import '../scss/components/jumbotron.scss'

const Jumbotron = () => {

    useEffect(() => {
        const canvas = document.getElementById("text-canvas")
        console.log(canvas)
        
        var ctx = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 50;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.arc(centerX, centerY+30, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#b279a7';
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(centerX-150, centerY-30, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#b279a7';
        ctx.fill();

    });



    return (
        <div className="jumbotron">
            <div className="text-container">
                <div className="text-background">
                    <canvas id="text-canvas" ></canvas>
                    <h1 className="large-text unselectable">Night At <br/> The Museum</h1>
                </div>

                <div className="btn-container" style={{"display":"none"}}>
                    <button className="btn-explore"><Link to="/explore">Explore</Link></button>
                </div>
            </div>


            <div className="morph-blob" style={{"display":"none"}}>
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45.1,-50.8C54.3,-46,54.6,-27.9,55.3,-11.6C55.9,4.7,56.8,19,51.2,30.4C45.6,41.8,33.5,50.3,18.5,59.3C3.6,68.4,-14.2,78.1,-32,76.5C-49.7,75,-67.5,62.1,-71.3,45.8C-75.1,29.6,-64.9,10,-56.2,-4.9C-47.6,-19.8,-40.6,-29.9,-31.5,-34.7C-22.4,-39.4,-11.2,-38.9,3.4,-42.9C18,-47,35.9,-55.6,45.1,-50.8Z" transform="translate(100 100)" />
                </svg>
            </div>
        </div>
    );
}

//                    

export default Jumbotron;