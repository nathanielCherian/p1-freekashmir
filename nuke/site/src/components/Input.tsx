import React from 'react';

export const Input = ({params}) => {
    console.log(params);
    return (
        <div className="input-box">
            <input {...params} className={"input"} />
        </div>
    )
}