import React from 'react'

interface btn {
    params?:any|undefined,
    text:string,
    onclick?:Function
}

export const Button:React.FC<btn> = ({params, text, onclick}) => {
    return (
        <div className="btn-box">
            <button {...params} className="btn" onClick={onclick}>{text}</button>
        </div>
    )
}