export enum Role{
    Candidate = "Candidate",
    Manager = "Manager",
    TechGuy = "TechGuy",
    Sales = "Sales",
    ResourcesGuy = "ResourcesGuy"
}

export interface User {
    name: string,
    email : string,
    password : string,
    role:Role
    createdAt : Date,
}

export interface InputUserField{
    name: string,
    email : string,
    password : string,
}