export enum Status{
    Suspended = "Suspended",
    NotSuspended = "NotSuspended",
}

export interface OrganizationMembers {
    userId: String,
}

export interface ProjectList {
    projectId: String
}
export interface Organization {
    password:string,
    email:string,
    orgName: string,
    project: ProjectList[],
    allMem: OrganizationMembers[],
    createdAt: Date,
    orgstatus: Status
}

export interface InputFieldsForOrganization{
    email: string;
    password: string;
    orgName: string;
}