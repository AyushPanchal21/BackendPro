import type { TaskRepository } from "../repository/taskRepository.js";
import { MongoTaskRepo } from "../../Data/repository/MongoTaskRepo.js";
import type{ TaskInputFields } from "../enitites/Task.js";
import { Status ,Priority} from "../enitites/Task.js";

export class CreateTask {
    private taskRepostitory: TaskRepository;
    constructor(taskRepostitory: TaskRepository) {
        this.taskRepostitory = taskRepostitory;
    }

    async execute (taskvariable:TaskInputFields){
        const newtask = await this.taskRepostitory.createTask({
            title:taskvariable.title,
            priority:Priority.Low,
            status:Status.NotStarted,
            projectId:taskvariable.projectId,
            orgId:taskvariable.orgId,
            createdBy:taskvariable.orgId,
            taskMem:[],
            due:taskvariable.due,
            createdAt:new Date()
        })
        return {
                status: true,
                message: "new task created",
                project:newtask,
            }
    }
}

const taskrepo = new MongoTaskRepo()
export const createtask = new CreateTask(taskrepo)
