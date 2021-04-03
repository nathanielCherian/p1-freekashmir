import React from 'react'

interface btn {
    params:any|undefined,
    text:string
}

export const Button:React.FC<btn> = ({params, text}) => {
    return (
        <div className="btn-box">
            <button {...params} className="btn">{text}</button>
        </div>
    )
}