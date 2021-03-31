// Defines all api responses

export interface Class{
    teacherName?:string
    classCode?:string,
    classSlug?:string,

    id?:number
    valid?:boolean
}

export interface ClassForm{
    auth?:string,
    teacherName?:string
    classCode?:string,
    classSlug?:string,
    
    id?:number

    valid?:boolean
}

export interface ClassFormResponse{
    classCode?:string
    completed?:boolean
}


export interface Project{
    studentName?:string
    grade?:number

    id?:number
    valid?:boolean
}
