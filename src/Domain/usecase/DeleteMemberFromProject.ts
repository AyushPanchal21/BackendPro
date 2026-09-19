import { MongoProjectRepo } from "../../Data/repository/MongoProjectRepo.js"
import type{ ProjectRepository } from "../repository/projectRepository.js"

export class DeleteMemberFromTask{
    private projectRepository :ProjectRepository
    constructor(projectRepository:ProjectRepository){
        this.projectRepository = projectRepository
    }

    async execute(projectid:String,userid:String){
        const project = await this.projectRepository.deleteMember(
            projectid,
            userid
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

const projectRepository = new MongoProjectRepo();

export const deleteproject = new DeleteMemberFromTask(projectRepository);