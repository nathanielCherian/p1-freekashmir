import React from 'react';

export const Input = ({params, onchange}) => {
    return (
        <div className="input-box">
            <input {...params} className={"input"} onChange={onchange}/>
        </div>
    )
}