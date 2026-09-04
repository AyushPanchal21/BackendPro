import mongoose, { Schema } from "mongoose";

enum Status{
    Done = "Done",
    InProgress = "InProgress",
    Halted = "Halted",
    NotStarted = "NotStarted"
}

interface TaskMember {
    userId: mongoose.Types.ObjectId;
    role: string;
}

interface TaskSchema {
    title: string;
    priority: string;
    status: Status;
    projectId: mongoose.Types.ObjectId;
    orgId: mongoose.Types.ObjectId;
    createdBy: mongoose.Types.ObjectId;
    taskMem: TaskMember[];
    due: Date;
    createdAt: Date;
}

const taskSchema = new Schema<TaskSchema>(
    {
        title: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: Object.values(Status),
            required: true,
        },

        priority: {
            type: String,
            required: true,
        },

        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },

        orgId: {
            type: Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },

        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        taskMem: [
            {
                userId: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },

                role: {
                    type: String,
                    required: true,
                },
            },
        ],

        due: {
            type: Date,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
    },
);

export const Task = mongoose.model<TaskSchema>("Task", taskSchema);