import React from 'react';
import '../scss/components/selection.scss'

const SelectionBox = (props:{text:string, onClicked:Function}) => {

    const {text, onClicked} = props;


    return(
        <div className="selection-box" onClick={()=>onClicked()}>
            <h1>{text}</h1>
        </div>
    )

}

export default SelectionBox;