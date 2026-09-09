import type { ProjectRepository } from "../repository/projectRepository.js";
import { MongoProjectRepo } from "../../Data/repository/MongoProjectRepo.js";
import { Status } from "../enitites/Project.js";

export class CreateProject {
    private projectRepository: ProjectRepository;
    constructor(projectRepository: ProjectRepository) {
        this.projectRepository = projectRepository;
    }
    async execute(id:string){
        const project = await this.projectRepository.findProjectId(id)
        if (project) {
            return {
                status: false,
                message: "project exists exists!",
            }
        }
        else{
            // const newproject = await this.projectRepository.createProject({})
            return {
                status: true,
                message: "new project created"
            }
        }
    }
}

