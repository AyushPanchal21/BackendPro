import mongoose, { Schema } from 'mongoose'
import type {Organization} from '../../Domain/enitites/Organization.js'
import { Status } from '../../Domain/enitites/Organization.js'

const organizationSchema = new Schema<Organization>({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    OrgName: {
        type: String,
        required: true,
    },
    Project: [
        {
            projectId: {
                type: Schema.Types.ObjectId,
                ref: "Project"
            }
        }
    ],
    status: {
        type: String,
        enum : Object.values(Status),
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
        default: Date.now
    },
})

export const OrganizationModel = mongoose.model<Organization>("Organization", organizationSchema)