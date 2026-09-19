import type{ TaskRepository } from "../repository/taskRepository.js"
import { MongoTaskRepo } from "../../Data/repository/MongoTaskRepo.js"

export class AddMembersToProject{
    private taskRepository :TaskRepository
    constructor(taskRepository:TaskRepository){
        this.taskRepository = taskRepository
    }

    async execute(id:String,members:String[]){
        const task = await this.taskRepository.addMemberToTask(
            id,
            members
        )

        if(!task){
            return {
                success:false,
            }
        }
        else{
            return {
                success:true,
                message:task
            }
        }
    }
}

const projectRepository = new MongoTaskRepo();

export const gettask = new AddMembersToProject(projectRepository);