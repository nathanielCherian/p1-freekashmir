import React, { useEffect, useState } from 'react';

interface input {
    params?:any,
    onchange?:Function
    isIncorrect?:boolean
}

export const Input:React.FC<input> = ({params, onchange}) => {
    
    const [incorrect, setIncorrect] = useState(false);

    return (
        <div className="input-box">
            <input {...params} className="input" autoComplete="off" onChange={onchange} onAnimationEnd={()=>setIncorrect(false)} data-incorrect={incorrect}/>
        </div>
    )
}