export enum Status{
    Pending="Pending",
    Rejected="Rejected",
    Accepted="Accepted",
}

export interface Application{
    orgid:string,
    userid:string,
    role:string,
    experience:string,
    status:Status
}
export interface ApplicationInputFields{
    orgid:string,
    userid:string,
    role:string,
    experience:string
}

export interface ApplicationQuery {
    userid: string
    orgid: string
}

export interface OrgApplicationQuery {
    orgid: string
}
