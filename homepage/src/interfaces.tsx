// Defines all api responses

export interface ClassForm{
    auth?:string,
    name?:string
}

export interface ClassFormResponse{
    classCode?:string
    completed?:boolean
}


export interface ProjectForm{
    classCode?:string,
    name?:string,
    grade?:number
}