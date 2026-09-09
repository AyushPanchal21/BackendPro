import mongoose, { Schema } from 'mongoose'
import type { Organization } from '../../Domain/enitites/Organization.js'
import { Status } from '../../Domain/enitites/Organization.js'

const organizationSchema = new Schema<Organization>({
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    orgName: {
        type: String,
        required: true,
    },
    project: [
        {
            projectId: {
                type: Schema.Types.ObjectId,
                ref: "Project"
            }
        }
    ],
    allMem: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    orgstatus:{
        type : String,
        enum:Object.values(Status),
        default:Status.NotSuspended
    }
})

export const OrganizationModel = mongoose.model<Organization>("Organization", organizationSchema)