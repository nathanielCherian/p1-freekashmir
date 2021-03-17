import React from 'react';
import '../scss/components/button.scss'

const Button = (props:{text:string}) => {

    const {text} = props;

    return (
        <button className="btn">{ text }</button>
    )
}

export default Button;