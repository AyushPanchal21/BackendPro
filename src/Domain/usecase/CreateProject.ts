import type { ProjectRepository } from "../repository/projectRepository.js";
import { MongoProjectRepo } from "../../Data/repository/MongoProjectRepo.js";
import { Status } from "../enitites/Project.js";
import type { Project ,InputProjectFields} from "../enitites/Project.js";

export class CreateProject {

    private projectRepository: ProjectRepository;
    constructor(projectRepository: ProjectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(projectvariable: InputProjectFields) {
        const project = await this.projectRepository.findProject(projectvariable.orgId,projectvariable.proName)
        if (project) {
            return {
                status: false,
                message: "project exists exists!",
            }
        }
        else {
            const newproject = await this.projectRepository.createProject({
                orgId: projectvariable.orgId,
                proName: projectvariable.proName,
                description: projectvariable.description,
                allMem: [],
                createdAt: new Date(),
                status: Status.NotStarted,
            })
            return {
                status: true,
                message: "new project created",
                project:newproject,
            }
        }
    }
}

const projectrepo = new MongoProjectRepo()
export const createproject = new CreateProject(projectrepo)


