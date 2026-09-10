export enum Status{
    Pending="Pending",
    Rejected="Rejected",
    Accepted="Accepted",
}

export interface ApplicationFields{
    orgid:string,
    userid:string,
    role:string,
    experience:string
}
