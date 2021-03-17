// @ts-nocheck

import React, { useState, useEffect } from 'react';
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
                    <h1 className="large-text">Night At <br/> The Museum</h1>
                </div>
            </div>
        </div>
    );
}

//                    

export default Jumbotron;