import React from 'react'

const Button = ({params, text}) => {
    return (
        <div className="btn-box">
            <button {...params}>{text}</button>
        </div>
    )
}