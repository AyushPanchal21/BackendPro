export enum Status{
    Done = "Done",
    InProgress = "InProgress",
    Halted = "Halted",
    NotStarted = "NotStarted"
}

export interface ProjectMembers {
    userId: String,
}

export interface Project {
    ProName: string,
    description: string,
    allMem: ProjectMembers[],
    createdAt: Date,
    status: string
    orgId: String,
}
