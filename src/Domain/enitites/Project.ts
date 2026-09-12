export enum Status {
    Done = "Done",
    InProgress = "InProgress",
    Halted = "Halted",
    NotStarted = "NotStarted"
}

export interface ProjectMembers {
    userId: String,
}

export interface Project {
    orgId: String,
    proName: String,
    description: String,
    allMem: ProjectMembers[],
    createdAt: Date,
    status: Status
}

export interface InputProjectFields {
    orgId: String,
    proName: String,
    description: String,
    allMem: [],
}