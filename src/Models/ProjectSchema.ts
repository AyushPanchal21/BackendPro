import mongoose, { Schema } from 'mongoose'

interface ProjectMembers {
    userId: mongoose.Types.ObjectId,
}

interface ProjectSchema {
    ProName: string,
    description: string,
    allMem: ProjectMembers[],
    createdAt: Date,
    status: string
    orgId: mongoose.Types.ObjectId,
}

const projectSchema = new Schema<ProjectSchema>({
    ProName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    orgId: {
        type: mongoose.Types.ObjectId,
        ref: "Organization",
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
        default: Date.now,
    },
})

export const Project = mongoose.model<ProjectSchema>("Project", projectSchema)