import React, { useEffect, useState } from 'react';

interface input {
    params?:any,
    onchange?:Function
    grow?:boolean
    isIncorrect?:boolean
}

export const Input:React.FC<input> = ({params, onchange, grow}) => {
    
    const [incorrect, setIncorrect] = useState(false);

    const classNames = ["input"]
    if(grow) classNames.push("input-expand");
    console.log(grow)


    return (
        <div className='input-box'>
            <input {...params} className={classNames.join(" ")} autoComplete="off" onChange={onchange} onAnimationEnd={()=>setIncorrect(false)} data-incorrect={incorrect}/>
        </div>
    )
}