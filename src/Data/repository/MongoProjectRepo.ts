import { ProjectModel } from "../Models/ProjectSchema.js";
import type { ProjectRepository } from "../../Domain/repository/projectRepository.js";
import type { Project } from "../../Domain/enitites/Project.js";

export class MongoProjectRepo implements ProjectRepository{
    async findProjectId(id: string) {
        return ProjectModel.findOne({id})
    }
    async createProject(project:Project): Promise<Project> {
            const newProject = new ProjectModel(project)
            return await newProject.save()
        }
}
