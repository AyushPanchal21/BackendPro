import { MongoProjectRepo } from "../../Data/repository/MongoProjectRepo.js";
import type { User } from "../enitites/User.js";
import type { ProjectRepository } from "../repository/projectRepository.js";

export class AddMembersToProject{
    private projectRepository :ProjectRepository
    constructor(projectRepository:ProjectRepository){
        this.projectRepository = projectRepository
    }

    async execute(id:String,members:User[]){
        const project = await this.projectRepository.addMemberToProject(
            id,
            members
        )

        if(!project){
            return {
                success:false,
            }
        }
        else{
            return {
                success:true,
                message:project
            }
        }
    }
}

const projectRepository = new MongoProjectRepo;

export const getproject = new AddMembersToProject(projectRepository);