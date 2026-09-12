import { ProjectModel } from "../Models/ProjectSchema.js";
import type { ProjectRepository } from "../../Domain/repository/projectRepository.js";
import type { Project } from "../../Domain/enitites/Project.js";

export class MongoProjectRepo implements ProjectRepository{
    async findProject(orgid: String,proname:String) {
        return ProjectModel.findOne({
            orgid,proname
        })
    }
    async createProject(project:Project): Promise<Project> {
            const newProject = new ProjectModel(project)
            return await newProject.save()
        }
}
