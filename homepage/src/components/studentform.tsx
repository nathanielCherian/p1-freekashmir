import React, {useState} from 'react';
import '../scss/components/createform.scss'

const StudentForm = () => {

    const handleSubmit = () => {
        //post to spring
    }

    const handleClassCode = (event:any) => {
        console.log(classCode)
        event.preventDefault();
    }

    const [classCode, setClassCode] = useState("");

    return (
        <div className="form-container">
            <form className="center-form" autoComplete="off" onSubmit={handleClassCode}>
                <label className="form-label">Class Code</label>
                <input type="text" name="classCode" maxLength={5} className="form-input__text" onChange={(event)=>setClassCode(event.target.value)}/>
                <input type="submit" className="form-submit"/>
            </form>
        </div>
    )
}

export default StudentForm;