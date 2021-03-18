import React from 'react';
import '../scss/components/selection.scss'

const SelectionBox = (props:{text:string}) => {

    const {text} = props;

    return(
        <div className="selection-box">
            <h1>{text}</h1>
        </div>
    )

}

export default SelectionBox;