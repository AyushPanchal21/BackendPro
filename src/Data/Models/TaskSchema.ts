import mongoose, { Schema } from "mongoose";
import {Status} from "../../Domain/enitites/Task.js"
import type {Task} from "../../Domain/enitites/Task.js"

const taskSchema = new Schema<Task>(
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

export const TaskModel = mongoose.model<Task>("Task", taskSchema);