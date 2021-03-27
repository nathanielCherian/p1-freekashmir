// Defines all api responses

export interface checkPassword{
    valid:boolean
}

export interface ClassForm{
    auth?:string,
    name?:string
}

export interface ClassFormResponse{
    classCode?:string
    completed?:boolean
}


export interface Student{

}