import mongoose, { Schema } from 'mongoose'

interface OrganizationMembers {
    userId: mongoose.Types.ObjectId,
}

interface ProjectList {
    projectId: mongoose.Types.ObjectId
}

interface OrganizationSchema {
    owner: mongoose.Types.ObjectId,
    OrgName: string,
    Project: ProjectList[],
    allMem: OrganizationMembers[],
    createdAt: Date,
    status: string
}

const organizationSchema = new Schema<OrganizationSchema>({
    owner: {
        type: mongoose.Types.ObjectId,
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
                type: mongoose.Types.ObjectId,
                ref: "Project"
            }
        }
    ],
    status: {
        type: String,
        required: true,
    },
    allMem: [
        {
            userId: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
})

export const Organization = mongoose.model<OrganizationSchema>("Organization", organizationSchema)