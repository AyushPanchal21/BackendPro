import mongoose, { Schema } from 'mongoose'
import type {Project} from "../../Domain/enitites/Project.js"
import { Status } from '../../Domain/enitites/Project.js'

const projectSchema = new Schema<Project>({
    ProName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum : Object.values(Status),
        required: true,
    },
    orgId: {
        type: Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    allMem: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const ProjectModel = mongoose.model<Project>("Project", projectSchema)