import React from 'react';
import '../scss/components/selection.scss'

const SelectionBox = (props:{text:string}) => {

    const {text} = props;

    const onSelect = () => {
        
    }

    return(
        <div className="selection-box" onClick={()=>onSelect()}>
            <h1>{text}</h1>
        </div>
    )

}

export default SelectionBox;