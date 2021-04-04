
export interface Class{
    id?:number,
    classCode?:number,
    className?:string,
    classSlug?:string,
    teacherName?:string,

    [key:string]: any, //Catch all (auth..)
}

export interface Project {
    id?:number,
    studentName?:string,
    grade?:number,
    classCode?:string //FOREIGN KEY to Class.classCode
}

