import mongoose, { Schema } from 'mongoose'
import type {Project} from "../../Domain/enitites/Project.js"
import { Status } from '../../Domain/enitites/Project.js'

const projectSchema = new Schema<Project>({
    orgId: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    proName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    allMem: [
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        role: {
            type: String,
        },
        createdAt: {
            type: Date,
        },
    }
],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum : Object.values(Status),
        required: true,
    },
})

export const ProjectModel = mongoose.model<Project>("Project", projectSchema)