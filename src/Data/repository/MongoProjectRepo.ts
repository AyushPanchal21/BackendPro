import { ProjectModel } from "../Models/ProjectSchema.js";
import type { ProjectRepository } from "../../Domain/repository/projectRepository.js";
import type { Project } from "../../Domain/enitites/Project.js";
import type { User } from "../../Domain/enitites/User.js";

export class MongoProjectRepo implements ProjectRepository {
    async findProject(orgid: String, proname: String) {
        return ProjectModel.findOne({
            orgid, proname
        })
    }
    async createProject(project: Project) {
        const newProject = new ProjectModel(project)
        return await newProject.save()
    }

    async addMemberToProject(id: String, members: User[]) {
        return ProjectModel.findByIdAndUpdate(id,
            {
                $push: {
                    allMem: {
                        $each: members
                    }
                }
            }, { new: true })
    }

    async deleteMember(taskid: string, userid: string) {
        return ProjectModel.findByIdAndUpdate(
            taskid,
            {
                $pull: {
                    allMem: {
                        userId: userid
                    }
                }
            },{ returnDocument: "after" }
        )
    }
}
