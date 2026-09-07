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
    owner: String,
    OrgName: string,
    Project: ProjectList[],
    allMem: OrganizationMembers[],
    createdAt: Date,
    status: Status
}