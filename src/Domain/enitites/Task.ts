export enum Status{
    Done = "Done",
    InProgress = "InProgress",
    Halted = "Halted",
    NotStarted = "NotStarted"
}

export interface TaskMember {
    userId: String;
    role: string;
}

export interface Task {
    title: string;
    priority: string;
    status: Status;
    projectId: String;
    orgId: String;
    createdBy: String;
    taskMem: TaskMember[];
    due: Date;
    createdAt: Date;
}