import type{ TaskRepository } from "../repository/taskRepository.js"
import { MongoTaskRepo } from "../../Data/repository/MongoTaskRepo.js"

export class DeleteMemberFromTask{
    private taskRepository :TaskRepository
    constructor(taskRepository:TaskRepository){
        this.taskRepository = taskRepository
    }

    async execute(taskid:String,userid:String){
        const task = await this.taskRepository.deleteMember(
            taskid,
            userid
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

const taskRepository = new MongoTaskRepo();

export const deletetask = new DeleteMemberFromTask(taskRepository);