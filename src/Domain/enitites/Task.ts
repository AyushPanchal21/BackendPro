export enum Status{
    Done = "Done",
    InProgress = "InProgress",
    Halted = "Halted",
    NotStarted = "NotStarted"
}

export enum Priority{
    High = "High",
    Highest = "Highest",
    Low = "Low",
    Lowest = "Lowest",
    Medium = "Medium",
}

export interface TaskMember {
    userId: String;
    role: string;
}

export interface Task {
    title: String;
    priority:Priority;
    status: Status;
    projectId: String;
    orgId: String;
    createdBy: String;
    taskMem: TaskMember[];
    due: Date;
    createdAt: Date;
}

export interface TaskInputFields{
    title:String,
    projectId:String,
    orgId:String,
    due:Date,
};

export interface TaskQuery{
    title : String,
    projectId  :String
}